import styles from "../../styles/homePage/actionCard.module.css";

const ActionCard = ({
    heading,
    subHeading,
    icon,
    action = () => {},
    loaded = true,
}) => {
    return (
        <>
            <div
                className={[
                    styles.main,
                    !loaded ? "loading " + styles.loading : undefined,
                ].join(" ")}
            >
                {loaded && (
                    <div className={styles.container}>
                        <div className={styles.info}>
                            <h3>{heading}</h3>
                            <p>{subHeading}</p>
                        </div>

                        <button
                            type="button"
                            className={styles.icon}
                            onClick={action}
                        >
                            {icon}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ActionCard;
