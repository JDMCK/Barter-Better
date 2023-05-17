import { useNavigate } from "react-router-dom";
import { Navbar, Footer, MarketplaceCard } from "../components";
import { chatIcon, searchIcon } from "../img";
import useConditionalFetch from "../hooks/useConditionalFetch";

const Home = () => {

  const [items] = useConditionalFetch('allItems', 'col', 'items');
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        title="BarterBetter"
        navButtons={[
          {
            icon: searchIcon,
            onclick: () => {
              navigate("/");
            },
          },
          {
            icon: chatIcon,
            onclick: () => {
              navigate("/conversations");
            },
          },
        ]}
      />
      <div className='marketplace-feed'>
        {items && JSON.parse(items).map((item, i) => (
          <MarketplaceCard key={i} item={item} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
