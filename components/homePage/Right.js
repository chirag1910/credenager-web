import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import nprogress from "nprogress";
import Link from "next/link";
import styles from "../../styles/homePage/right.module.css";
import Api from "../../utils/api";
import { deleteGroup as deleteGroupAction } from "../../redux/action/data";
import {
    setShowGroupMenu as setShowGroupMenuAction,
    setShowAddCred as setShowAddCredAction,
} from "../../redux/action/misc";
import Creds from "./Creds";
import CUGroup from "./CUGroup";
import ActionCard from "./ActionCard";
import ConfirmationDialog from "../ConfirmationDialog";

const Right = ({
    dataLoaded,
    activeGroup,
    showGroupMenu,
    showAddCred,
    deleteGroupAction,
    setShowGroupMenuAction,
    setShowAddCredAction,
}) => {
    const [query, setQuery] = useState("");
    const [showAddGroup, setShowAddGroup] = useState(false);
    const [showEditGroup, setShowEditGroup] = useState(false);
    const [showDeleteGroup, setShowDeleteGroup] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.done();
    }, [loading]);

    const handleDeleteGroup = async () => {
        setLoading(true);

        const response = await new Api().deleteGroup(activeGroup?.id);

        if (response.status === "ok") {
            setShowDeleteGroup(false);
            toast.success(response.message);
            deleteGroupAction(activeGroup.id);
        } else {
            toast.error(response.error);
        }

        setLoading(false);
    };

    return (
        <>
            <div className={styles.main}>
                <div className={styles.header}>
                    <button
                        type="button"
                        onClick={() => setShowGroupMenuAction(!showGroupMenu)}
                    >
                        <svg viewBox="0 0 30 23" fill="none">
                            <path
                                d="M2 2H27.4"
                                stroke="white"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2 11.0714H27.4"
                                stroke="white"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2 20.1428H27.4"
                                stroke="white"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <input
                        type="text"
                        id="query"
                        name="query"
                        placeholder="Search here..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <Link href="/settings">
                        <a>
                            <div className={styles.icon}>
                                <svg viewBox="0 0 25 26" fill="none">
                                    <path
                                        d="M13.4437 0C14.4388 0 15.3397 0.546 15.8372 1.352C16.0793 1.742 16.2407 2.223 16.2003 2.73C16.1734 3.12 16.2944 3.51 16.5096 3.874C17.1954 4.979 18.7149 5.395 19.8982 4.771C21.2294 4.017 22.9103 4.472 23.6767 5.759L24.5777 7.293C25.3576 8.58 24.9273 10.231 23.5826 10.972C22.4396 11.635 22.0362 13.104 22.722 14.222C22.9372 14.573 23.1792 14.872 23.5557 15.054C24.0264 15.301 24.3894 15.691 24.6449 16.081C25.1424 16.887 25.1021 17.875 24.618 18.746L23.6767 20.306C23.1792 21.138 22.2514 21.658 21.2967 21.658C20.826 21.658 20.3016 21.528 19.8713 21.268C19.5217 21.047 19.1183 20.969 18.688 20.969C17.3567 20.969 16.2407 22.048 16.2003 23.335C16.2003 24.83 14.9632 26 13.4168 26H11.5881C10.0282 26 8.79112 24.83 8.79112 23.335C8.76423 22.048 7.64814 20.969 6.31691 20.969C5.87317 20.969 5.46976 21.047 5.13359 21.268C4.70329 21.528 4.16542 21.658 3.70823 21.658C2.74006 21.658 1.81223 21.138 1.3147 20.306L0.386868 18.746C-0.110664 17.901 -0.137557 16.887 0.359975 16.081C0.575123 15.691 0.978528 15.301 1.43572 15.054C1.81223 14.872 2.05427 14.573 2.28287 14.222C2.95521 13.104 2.5518 11.635 1.40883 10.972C0.0775916 10.231 -0.352706 8.58 0.413762 7.293L1.3147 5.759C2.09461 4.472 3.76202 4.017 5.1067 4.771C6.27657 5.395 7.79606 4.979 8.48185 3.874C8.69699 3.51 8.81802 3.12 8.79112 2.73C8.76423 2.223 8.91214 1.742 9.16763 1.352C9.66516 0.546 10.5661 0.026 11.5477 0H13.4437ZM12.5159 9.334C10.4047 9.334 8.69699 10.972 8.69699 13.013C8.69699 15.054 10.4047 16.679 12.5159 16.679C14.627 16.679 16.2944 15.054 16.2944 13.013C16.2944 10.972 14.627 9.334 12.5159 9.334Z"
                                        stroke="none"
                                    />
                                </svg>
                            </div>
                        </a>
                    </Link>
                </div>

                <div className={styles.actions}>
                    {dataLoaded ? (
                        <>
                            <ActionCard
                                heading="New Credential"
                                subHeading={`Create a new credential${
                                    activeGroup?.id ? " in this group" : ""
                                }`}
                                icon={
                                    <svg
                                        viewBox="0 0 15 14"
                                        fill="none"
                                        transform={
                                            showAddCred ? "rotate(45 0 0)" : ""
                                        }
                                    >
                                        <path d="M7.422 0.131149C7.12819 0.131149 6.84641 0.245381 6.63866 0.448716C6.4309 0.652051 6.31419 0.927832 6.31419 1.21539V5.55235H1.88294C1.58913 5.55235 1.30736 5.66659 1.0996 5.86992C0.891847 6.07326 0.775131 6.34904 0.775131 6.63659C0.775131 6.92415 0.891847 7.19993 1.0996 7.40327C1.30736 7.6066 1.58913 7.72083 1.88294 7.72083H6.31419V12.0578C6.31419 12.3454 6.4309 12.6211 6.63866 12.8245C6.84641 13.0278 7.12819 13.142 7.422 13.142C7.71581 13.142 7.99758 13.0278 8.20534 12.8245C8.41309 12.6211 8.52981 12.3454 8.52981 12.0578V7.72083H12.9611C13.2549 7.72083 13.5366 7.6066 13.7444 7.40327C13.9522 7.19993 14.0689 6.92415 14.0689 6.63659C14.0689 6.34904 13.9522 6.07326 13.7444 5.86992C13.5366 5.66659 13.2549 5.55235 12.9611 5.55235H8.52981V1.21539C8.52981 0.927832 8.41309 0.652051 8.20534 0.448716C7.99758 0.245381 7.71581 0.131149 7.422 0.131149Z" />
                                    </svg>
                                }
                                action={() =>
                                    setShowAddCredAction(!showAddCred)
                                }
                            />

                            {activeGroup?.id && (
                                <>
                                    <ActionCard
                                        heading="Edit Group"
                                        subHeading="Edit the name of the group"
                                        icon={
                                            <svg
                                                viewBox="0 0 19 17"
                                                fill="none"
                                            >
                                                <path d="M17.7489 15.067C18.3128 15.067 18.7714 15.5005 18.7714 16.0335C18.7714 16.5675 18.3128 17 17.7489 17H11.9695C11.4057 17 10.9471 16.5675 10.9471 16.0335C10.9471 15.5005 11.4057 15.067 11.9695 15.067H17.7489ZM13.7409 0.660227L15.2338 1.76685C15.846 2.21356 16.2542 2.80241 16.3938 3.42171C16.5549 4.10295 16.3831 4.772 15.8997 5.35069L7.00675 16.0819C6.59861 16.5692 5.99716 16.8433 5.35274 16.8535L1.80842 16.8941C1.6151 16.8941 1.45399 16.7723 1.41103 16.5997L0.605507 13.3407C0.465882 12.7417 0.605507 12.1224 1.01364 11.6453L7.31822 4.03086C7.42562 3.90903 7.61895 3.88974 7.74783 3.9801L10.4007 5.94969C10.5725 6.08167 10.8088 6.15274 11.0559 6.12228C11.5821 6.06137 11.9366 5.61466 11.8829 5.13749C11.8506 4.89383 11.7218 4.69078 11.5499 4.53849C11.4962 4.49788 8.97223 2.60951 8.97223 2.60951C8.81112 2.48768 8.7789 2.26433 8.90779 2.11305L9.90664 0.903887C10.8303 -0.202738 12.4414 -0.304263 13.7409 0.660227Z" />
                                            </svg>
                                        }
                                        action={() => setShowEditGroup(true)}
                                    />

                                    <ActionCard
                                        heading="Delete Group"
                                        subHeading="It will also erase all group's credentials"
                                        icon={
                                            <svg
                                                viewBox="0 0 18 17"
                                                fill="none"
                                            >
                                                <path d="M15.245 5.69256C15.4349 5.69256 15.6073 5.76651 15.7434 5.89146C15.8704 6.02491 15.9343 6.19066 15.9158 6.36576C15.9158 6.42356 15.4081 12.1525 15.1181 14.5639C14.9365 16.0438 13.8674 16.9422 12.2637 16.9669C11.0306 16.9915 9.82529 17 8.6385 17C7.37853 17 6.14635 16.9915 4.95031 16.9669C3.40036 16.9337 2.33031 16.0191 2.15799 14.5639C1.85967 12.144 1.36124 6.42356 1.35198 6.36576C1.34271 6.19066 1.40571 6.02491 1.53356 5.89146C1.65956 5.76651 1.84114 5.69256 2.03199 5.69256H15.245ZM10.6017 0C11.4439 0 12.1962 0.524445 12.4139 1.27244L12.5695 1.89293C12.6955 2.39868 13.1865 2.75652 13.7517 2.75652H16.5292C16.8998 2.75652 17.2083 3.03107 17.2083 3.38042V3.70341C17.2083 4.04426 16.8998 4.32731 16.5292 4.32731H0.741538C0.370031 4.32731 0.0615234 4.04426 0.0615234 3.70341V3.38042C0.0615234 3.03107 0.370031 2.75652 0.741538 2.75652H3.51903C4.08324 2.75652 4.57426 2.39868 4.70118 1.89378L4.84664 1.31409C5.07269 0.524445 5.81663 0 6.66804 0H10.6017Z" />
                                            </svg>
                                        }
                                        action={() => setShowDeleteGroup(true)}
                                    />
                                </>
                            )}

                            <ActionCard
                                heading="New Group"
                                subHeading="Create a new group"
                                icon={
                                    <svg viewBox="0 0 15 14" fill="none">
                                        <path d="M7.422 0.131149C7.12819 0.131149 6.84641 0.245381 6.63866 0.448716C6.4309 0.652051 6.31419 0.927832 6.31419 1.21539V5.55235H1.88294C1.58913 5.55235 1.30736 5.66659 1.0996 5.86992C0.891847 6.07326 0.775131 6.34904 0.775131 6.63659C0.775131 6.92415 0.891847 7.19993 1.0996 7.40327C1.30736 7.6066 1.58913 7.72083 1.88294 7.72083H6.31419V12.0578C6.31419 12.3454 6.4309 12.6211 6.63866 12.8245C6.84641 13.0278 7.12819 13.142 7.422 13.142C7.71581 13.142 7.99758 13.0278 8.20534 12.8245C8.41309 12.6211 8.52981 12.3454 8.52981 12.0578V7.72083H12.9611C13.2549 7.72083 13.5366 7.6066 13.7444 7.40327C13.9522 7.19993 14.0689 6.92415 14.0689 6.63659C14.0689 6.34904 13.9522 6.07326 13.7444 5.86992C13.5366 5.66659 13.2549 5.55235 12.9611 5.55235H8.52981V1.21539C8.52981 0.927832 8.41309 0.652051 8.20534 0.448716C7.99758 0.245381 7.71581 0.131149 7.422 0.131149Z" />
                                    </svg>
                                }
                                action={() => setShowAddGroup(true)}
                            />
                        </>
                    ) : (
                        <>
                            {Array.from(Array(4).keys()).map((action, i) => (
                                <ActionCard key={i} loaded={false} />
                            ))}
                        </>
                    )}
                </div>

                <div className={styles.container}>
                    <Creds query={query} />
                </div>
            </div>

            {showAddGroup && <CUGroup close={() => setShowAddGroup(false)} />}
            {showEditGroup && (
                <CUGroup
                    groupId={activeGroup?.id}
                    groupName={activeGroup?.name}
                    close={() => setShowEditGroup(false)}
                />
            )}
            {showDeleteGroup && (
                <ConfirmationDialog
                    heading="All group credentials will also be deleted"
                    buttonText="Delete"
                    onCancel={() => setShowDeleteGroup(false)}
                    onSuccess={handleDeleteGroup}
                />
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        dataLoaded: state.data.loaded,
        activeGroup: state.misc.activeGroup,
        showGroupMenu: state.misc.showGroupMenu,
        showAddCred: state.misc.showAddCred,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteGroupAction: (id) => dispatch(deleteGroupAction(id)),
        setShowGroupMenuAction: (show) =>
            dispatch(setShowGroupMenuAction(show)),
        setShowAddCredAction: (show) => dispatch(setShowAddCredAction(show)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Right);
