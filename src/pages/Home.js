import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Footer, MarketplaceCard } from '../components';
import { chatIcon, logo } from '../img';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { firestore } from '../config/firebase';

const Home = () => {

  const [items, setItems] = useState();

  useEffect(() => {
    const getItemDocs = async () => {
      const itemsColRef = collection(firestore, 'items');
      const itemsQuery = query(itemsColRef, orderBy('timeStamp', 'desc'), where('isTraded', '==', false));
      const itemDocs = await getDocs(itemsQuery);
      setItems(itemDocs);
    }
    getItemDocs();
  }, [])

  const navigate = useNavigate();

  return (
    <>
      <div className='marketplace-feed'>
        <Navbar
          title={
            <Link to={'/og'}>
              <img src={logo} alt='BarterBetter' className='nav-logo' />
            </Link>
          }
          navButtons={[
            {
              icon: chatIcon,
              onclick: () => {
                navigate('/conversations');
              },
            }
          ]}
        />
        {items && items.docs.map((itemDoc, i) => (
          <MarketplaceCard key={i} itemDoc={itemDoc} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
