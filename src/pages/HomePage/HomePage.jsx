import { Link } from "react-router"
import frontRoutes from "@/routes/frontRoutes"
import css from "./HomePage.module.css"

function HomePage() {
    return (
        <div className={css.container}>
            <div className={css.card}>
                <h1 className={css.title}>
                    Ваш час - під вашим контролем!
                </h1>
                <p className={css.description}>
                    Відкрийте для себе найкращі заклади та сервіси міста.
                    Бронюйте послуги миттєво, керуйте своїми записами в один клік
                    та отримуйте преміальний сервіс.
                </p>
                <div className={css.links}>
                    <Link to={frontRoutes.PAGES.BUSINESSES.ROOT} className={css.link}>
                        Переглянути сервіси
                    </Link>
                    <Link to={frontRoutes.PAGES.MY_BOOKINGS} className={css.link}>
                        Мої бронювання
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage




