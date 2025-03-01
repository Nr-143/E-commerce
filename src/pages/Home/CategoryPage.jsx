import { useParams } from "react-router-dom";
import MobileListing from "../../components/MobileListing/MobileListing";
import DesktopListing from "../../components/DesktopListing/DesktopListing";

const CategoryPage = () => {
    const { categoryId } = useParams();
    const isMobile = window.innerWidth <= 768; // Detect mobile view

    return isMobile ? <MobileListing category={categoryId} /> : <DesktopListing category={categoryId} />;
};

export default CategoryPage;
