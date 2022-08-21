import styles from "../../styles/dialog/authForm.module.css";
import dialogStyles from "../../styles/dialog/dialog.module.css";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import nprogress from "nprogress";
import Api from "../../utils/api";
import { connect } from "react-redux";
import { addGroup as addGroupAction } from "../../redux/action/data";

const AddGroup = ({ addGroupAction, close }) => {
    const dialog = useRef(null);

    const [name, setName] = useState("");

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.done();
    }, [loading]);

    useEffect(() => {
        setShow(true);
        window.addEventListener("mousedown", handleMouseClick);
        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("mousedown", handleMouseClick);
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    const handleKeyPress = (e) => {
        e = e || window.event;
        if (e.code === "Escape") {
            e.preventDefault();
            handleDismiss();
        }
    };

    const handleMouseClick = (e) => {
        if (dialog.current && !dialog.current.contains(e.target)) {
            handleDismiss();
        }
    };

    const handleDismiss = () => {
        setShow(false);
        close();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValidForm()) {
            setLoading(true);

            const response = await new Api().createGroup(name);

            if (response.status === "ok") {
                toast.success(response.message);
                addGroupAction(response._id, response.name);
                handleDismiss();
            } else {
                toast.error(response.error);
            }

            setLoading(false);
        }
    };

    const isValidForm = () => {
        if (!name) {
            toast.error("Group name is required");
            return false;
        }

        return true;
    };

    return (
        <>
            <div
                className={[
                    dialogStyles.main,
                    show ? dialogStyles.show : undefined,
                ].join(" ")}
            >
                <div className={dialogStyles.container} ref={dialog}>
                    <div className={styles.main}>
                        <h2>Add Group</h2>
                        <form
                            onSubmit={(e) => handleSubmit(e)}
                            style={{ marginBottom: "0px" }}
                        >
                            <div className={styles.formControl}>
                                <label htmlFor="name" />
                                <div className={styles.inputField}>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Group name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <button
                                className={styles.formButton}
                                type="submit"
                                disabled={loading}
                            >
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addGroupAction: (id, name) => dispatch(addGroupAction(id, name)),
    };
};

export default connect(null, mapDispatchToProps)(AddGroup);
