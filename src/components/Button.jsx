/**
 * A reusable CTA button component.
 * When clicked, it scrolls smoothly to the section with ID "counter",
 * with a small offset from the top for better visual placement.
 */

const Button = ({ text, className, id, href }) => {
    const handleClick = (e) => {
        const targetId = id || (href?.startsWith("#") ? href.slice(1) : null);

        // smooth scroll mode
        if (targetId) {
            e.preventDefault();

            const target = document.getElementById(targetId);
            if (target) {
                const offset = window.innerHeight * 0.15; // top gap
                const top =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    offset;

                window.scrollTo({ top, behavior: "smooth" });
            }
        }
    };

    return (
        <a
            href={href ?? "#"}
            onClick={handleClick}
            className={`${className ?? ""} cta-wrapper`}
        >
            <div className="cta-button group ">
                <div className="bg-circle" />
                <p className="text">{text}</p>
                <div className="arrow-wrapper">
                    <img src="/images/arrow-down.svg" alt="arrow" />
                </div>
            </div>
        </a>
    );
};

export default Button;


