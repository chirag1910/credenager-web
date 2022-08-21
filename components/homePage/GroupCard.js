import styles from "../../styles/homePage/groupCard.module.css";

const GroupCard = ({ name, icon, selected, onClick, loaded = true }) => {
    return loaded ? (
        <>
            <button
                type="button"
                className={[
                    styles.main,
                    selected ? styles.selected : undefined,
                ].join(" ")}
                onClick={onClick}
            >
                <div className={styles.container}>
                    <div className={styles.icon}>
                        {icon || <p>{name[0]}</p>}
                    </div>
                    <div className={styles.content}>{name}</div>
                </div>
            </button>
        </>
    ) : (
        <>
            <button
                type="button"
                className={[styles.main, "loading", styles.loading].join(" ")}
            />
        </>
    );
};

export default GroupCard;
