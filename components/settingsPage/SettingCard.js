import styles from "../../styles/settingsPage/settingCard.module.css";

const SettingCard = ({
    heading,
    subheading,
    icon,
    tooltip,
    onClick = () => {},
    loading = false,
    disabled = false,
}) => {
    return (
        <>
            <div
                className={[
                    styles.main,
                    loading ? "loading " + styles.loading : undefined,
                ].join(" ")}
            >
                {!loading && (
                    <div className={styles.container}>
                        <div className={styles.info}>
                            <h3>{heading}</h3>
                            <p>{subheading}</p>
                        </div>

                        <button
                            type="button"
                            className={styles.icon}
                            onClick={onClick}
                            disabled={disabled}
                            title={tooltip}
                        >
                            {icon}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default SettingCard;
