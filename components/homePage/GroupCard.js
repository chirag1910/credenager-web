import styles from "../../styles/homePage/groupCard.module.css";
import { useEffect, useRef, useState } from "react";

const GroupCard = ({
    name,
    icon = null,
    selected = false,
    onClick = () => {},
    onCredDropped = () => {},
    loaded = true,
}) => {
    const cardRef = useRef(null);

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [cardRef, isHovered]);

    useEffect(() => {
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isHovered]);

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const cardCoordinates = cardRef.current.getBoundingClientRect();
            if (
                e.pageX > cardCoordinates.x &&
                e.pageX < cardCoordinates.x + cardCoordinates.width &&
                e.pageY > cardCoordinates.y &&
                e.pageY < cardCoordinates.y + cardCoordinates.height
            ) {
                !isHovered && setIsHovered(true);
            } else {
                isHovered && setIsHovered(false);
            }
        } else {
            setIsHovered(false);
        }
    };

    const handleMouseUp = (e) => {
        if (isHovered) {
            onCredDropped();
        }
    };

    return loaded ? (
        <>
            <button
                type="button"
                className={[
                    styles.main,
                    selected ? styles.selected : undefined,
                    isHovered ? styles.hovered : undefined,
                ].join(" ")}
                onClick={onClick}
                ref={cardRef}
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
