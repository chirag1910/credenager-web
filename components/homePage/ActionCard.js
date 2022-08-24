import styles from "../../styles/homePage/actionCard.module.css";

const ActionCard = ({ heading, subHeading, icon, action = () => {} }) => {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.info}>
                        <h3>{heading}</h3>
                        <p>{subHeading}</p>
                    </div>

                    <button type="button" className={styles.icon}>
                        {icon}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ActionCard;