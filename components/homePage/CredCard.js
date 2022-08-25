import { connect } from "react-redux";
import { useState, useEffect } from "react";
import styles from "../../styles/homePage/credCard.module.css";

const CredCard = ({ cred }) => {
    const [identifier, setIdentifier] = useState(cred.identifier);
    const [value, setValue] = useState(cred.value);
    const [showCred, setShowCred] = useState(false);
    const [allowEditing, setAllowEditing] = useState(false);

    return (
        <>
            <tr className={styles.tr}>
                <td className={styles.idInput}>
                    <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        disabled={!allowEditing}
                    />
                </td>
                <td className={styles.credInput}>
                    <input
                        type={showCred ? "text" : "password"}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={!allowEditing}
                    />
                </td>
                <td>Actions</td>
            </tr>
        </>
    );
};

export default CredCard;
