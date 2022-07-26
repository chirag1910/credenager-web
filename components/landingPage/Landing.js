import styles from "../../styles/landingPage/landing.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import BGCarousel from "./BGCarousel";

const Landing = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");

    const handleSignupButton = (e) => {
        e.preventDefault();
        router.replace({
            href: "/",
            query: { action: "signup", prefill: email.trim(), next: "/home" },
        });
    };

    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1>Credenager</h1>
                    <p>
                        <span>Encrypted Credentials Manager!</span> Manage all
                        your digital keys and passwords securely.
                    </p>
                    <form onSubmit={(e) => handleSignupButton(e)}>
                        <div className={styles.inputGroup}>
                            <div className={styles.formControl}>
                                <label htmlFor="email" />
                                <div className={styles.inputField}>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <button type="submit">Signup</button>
                        </div>
                    </form>
                    <p>
                        Already have an account?{" "}
                        <span>
                            <Link href="/?action=login&amp;next=/home" replace>
                                <a>Log in.</a>
                            </Link>
                        </span>
                    </p>

                    <div className={styles.linkGroup}>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.credenager"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className={styles.iconTextLink}>
                                <svg viewBox="0 0 102 110">
                                    <path d="M0 6.74103V103.102C0.000645567 103.311 0.0629998 103.515 0.179244 103.689C0.295488 103.863 0.460447 103.999 0.653436 104.079C0.846425 104.159 1.05885 104.181 1.26408 104.141C1.46931 104.101 1.65821 104.002 1.80708 103.855L51.9811 54.9241L1.80708 5.98828C1.65821 5.8415 1.46931 5.74194 1.26408 5.70209C1.05885 5.66223 0.846425 5.68386 0.653436 5.76425C0.460447 5.84464 0.295488 5.98022 0.179244 6.15398C0.0629998 6.32775 0.000645567 6.53197 0 6.74103Z" />
                                    <path d="M73.0188 34.8182L10.1069 0.157655L10.0677 0.135588C8.98396 -0.452877 7.95414 1.01338 8.84174 1.86666L58.1576 49.0223L73.0188 34.8182Z" />
                                    <path d="M8.84657 107.982C7.95407 108.835 8.98388 110.301 10.0725 109.713L10.1118 109.691L73.0187 75.03L58.1575 60.821L8.84657 107.982Z" />
                                    <path d="M98.4159 48.7942L80.8478 39.1189L64.3291 54.9241L80.8478 70.7219L98.4159 61.0539C103.195 58.4132 103.195 51.435 98.4159 48.7942Z" />
                                </svg>

                                <p>
                                    Get it on <span>Google Play</span>
                                </p>
                            </div>
                        </a>

                        <a
                            href="https://github.com/chirag1910/credenager-web.git"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className={styles.iconTextLink}>
                                <svg viewBox="0 0 388 378">
                                    <path d="M193.583 0C168.161 0 142.988 5.00717 119.502 14.7356C96.0153 24.4641 74.6749 38.7233 56.6991 56.6991C20.3953 93.0029 0 142.241 0 193.583C0 279.146 55.5583 351.74 132.411 377.486C142.09 379.035 145.187 373.034 145.187 367.807C145.187 363.355 145.187 351.159 145.187 335.092C91.5647 346.707 80.1433 309.152 80.1433 309.152C71.2385 286.696 58.6556 280.695 58.6556 280.695C41.0396 268.693 60.0107 269.08 60.0107 269.08C79.3689 270.435 89.6288 289.019 89.6288 289.019C106.471 318.444 134.927 309.732 145.961 305.086C147.704 292.504 152.737 283.986 158.157 279.146C115.182 274.307 70.077 257.659 70.077 183.904C70.077 162.416 77.4331 145.187 90.016 131.443C88.0802 126.603 81.3048 106.471 91.9518 80.3369C91.9518 80.3369 108.213 75.1101 145.187 100.082C160.48 95.8235 177.128 93.6941 193.583 93.6941C210.037 93.6941 226.685 95.8235 241.978 100.082C278.953 75.1101 295.214 80.3369 295.214 80.3369C305.861 106.471 299.085 126.603 297.15 131.443C309.732 145.187 317.089 162.416 317.089 183.904C317.089 257.852 271.79 274.113 228.621 278.953C235.59 284.954 241.978 296.762 241.978 314.766V367.807C241.978 373.034 245.076 379.229 254.949 377.486C331.801 351.546 387.166 279.146 387.166 193.583C387.166 168.161 382.158 142.988 372.43 119.502C362.702 96.0153 348.442 74.6749 330.466 56.6991C312.491 38.7233 291.15 24.4641 267.664 14.7356C244.177 5.00717 219.004 0 193.583 0V0Z" />
                                </svg>

                                <p>
                                    Source code on <span>Github</span>
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <BGCarousel />
        </>
    );
};

export default Landing;
