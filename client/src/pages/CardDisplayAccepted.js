// modules
import { useState, useEffect } from 'react';

//APIs
import { getSwaps } from '../apis/request.js';

// components
import AcceptedCardType2 from '../components/AcceptedCardType2.js';
import Pagination from '../components/Pagination.js';
import Footer from '../components/Footer.js';

function CardDisplayAccepted() {
  // accepted swaps를 필터링 한 후 저장합니다
  const [accepted, setAccepted] = useState([]);

  // 하나의 page에 들어갈 데이터를 저장합니다
  const [page, setPage] = useState(1); //현재 페이지
  const handlePageChange = (page) => {
    setPage(page);
  };
  const limit = 10; // posts가 보일 최대한의 갯수
  const offset = (page - 1) * limit; // 시작점과 끝점을 구하는 offset, 현재의 page가 변함에 따라 offset도 달라진다

  const postsData = (posts) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit); // offset: 하나의 페이지에 보여줄 posts의 시작점, limit: 끝점
      return result;
    }
  };

  const postCards = postsData(accepted);

  useEffect(() => {
    const APIdata = getSwaps();
    const getData = () => {
      APIdata.then((response) => {
        const acceptedData = response.filter(
          (swap) => swap.status === 'active',
        );

        setAccepted([...acceptedData].reverse());
        console.log([...acceptedData].reverse());
      });
    };
    getData();
  }, []);

  return (
    <>
      <div>
        <div className="mt-[6rem] mb-[7rem]">
          <div className="text-center text-5xl font-bold">
            Accepted Crypto Default Swap Cards
          </div>
          <div className="flex justify-center w-screen mx-auto">
            <div className="w-[18.5rem] h-[3px] bg-primaryColor my-[2rem]"></div>
          </div>
          <div className="text-center text-sm font-light">
            Explore our decentralized Crypto Defatult Swaps!
          </div>
          <div>
            <p className="text-center text-sm font-light">
              Buyer can claim compensation from Seller when the reference asset
              reaches below Claim Price.
            </p>
            <p className="text-center text-sm font-light">
              {' '}
              When the reference asset falls below the Liquidation price,
            </p>
            <p className="text-center text-sm font-light">
              {' '}
              the maximum compensation will be paid immediately upon requesting
              Claim.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-fill-25 justify-center">
          {postCards.map((swap) => {
            return (
              <div className="mx-auto" key={swap.swapId}>
                <AcceptedCardType2
                  swapId={swap.swapId}
                  InitialPrice={swap.initialAssetPrice}
                  ClaimPrice={swap.claimPrice}
                  Liquidation
                  Price={swap.liquidationPrice}
                />
              </div>
            );
          })}
        </div>
        <div>
          <Pagination
            page={page}
            limit={limit}
            totalPosts={accepted.length}
            handlePageChange={handlePageChange} //현재 페이지의 위치를 설정하는 handlePageChange props로 넘긴다
          />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default CardDisplayAccepted;