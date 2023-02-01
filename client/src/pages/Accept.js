// modules
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'

// components
import Footer from '../components/Footer';
import ScrollButton from '../components/ScrollButton';

// hooks
import useCDS from '../utils/hooks/useCDS';

// apis
import { getSwapById } from '../apis/request';

// utils
import { calculateTimeRemaining } from '../utils/calendar';

// css
import '../assets/css/negotiate.css';

function Accept() {
  const navigate = useNavigate();

  const {swapId} = useParams();
  const [swapOnChain, setSwapOnChain] = useState(null);
  const [swapOnDB, setSwapOnDB] = useState(null);
  const userAddress = useSelector(state=>state.auth.user_addr);
  const CDS = useCDS();

  // Accept CDS Handler
  const acceptButtonHandler = async()=>{
    console.log(
      swapOnChain.initAssetPrice,
      swapId,
      swapOnChain.seller.deposit,
      userAddress,
    )

    try {
      const result = await CDS.acceptSwap(
        swapOnChain.initAssetPrice, 
        swapId,
        swapOnChain.seller.deposit,
        userAddress
      );

      console.log(result);

      navigate('/');
    } catch(err) {
      console.log(err);
    }
  }

  // Cancel CDS Handler
  const cancelButtonHandler = async()=>{
    console.log(swapId);

    const result = await CDS.cancelSwap(
      swapId,
      userAddress,
    );

    console.log(result);
  }

  useEffect(()=>{
    getSwapById(swapId)
    .then(result=>{
      setSwapOnDB(result);
    })
  },[])

  useEffect(()=>{
    if( CDS ) {
      CDS.getSwap(swapId)
      .then(result=> {
        setSwapOnChain(result);
      });
    };
  }, [CDS]);

  useEffect(()=>{
    if(swapOnDB){
      console.log(userAddress);
      console.log(swapOnDB.buyer.toLowerCase());
      console.log(userAddress === swapOnDB.buyer.toLowerCase());

    }
  }, [swapOnDB, userAddress])

  return (
    <>
      <div className='negotiate-banner'>
        <img/>
      </div>
      <div className='container container-negotiate'>
        <div className='negotiate-head'>
          <h1 className='negotiate-head-title'>Check Crypto Default Swap</h1>
          <p className='negotiate-head-notice text-xl font-semibold py-2'>Check Your Crypto Default Swap Contract in detail and sign it!</p>
          <hr className='line w-[150px] color-[var(--primary-color)]'/>
        </div>
        <div className='negotiate-form'>
          <div className='form-section'>
            <h2 className='section-title'>Address</h2>
            <div className='input-group'>
              <div className='input-button'>
                <input 
                  value={swapOnDB ? `Buyer Address: ${swapOnDB.buyer}` : null}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Assets</h2>
            <div className='input-group'>
              <input 
                placeholder='Initial Price of Assets' 
                value={swapOnDB? `Initial Price of Assets: ${swapOnDB.initialAssetPrice}`: null}
                disabled
              />
              <input 
                placeholder='The Amount of Assets' 
                value={swapOnDB? `The Amount of Assets: ${swapOnDB.amountOfAssets}` : null}
                disabled
              />
              <input 
                placeholder='Total Assets' 
                value={swapOnDB? `Total Assets: ${swapOnDB.totalAssets}` : null}
                disabled
              />
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Claim</h2>
            <div className='input-group'>
              <input 
                placeholder='Claim Price' 
                value={swapOnDB? `Claim Price: ${swapOnDB.claimPrice}`: null}
                disabled
              />
              <div className='input-range'>
                <input 
                  placeholder='Drop Rate' 
                  value={swapOnDB? `Drop Rate: ${swapOnDB.dropRate * 100} %`: null}
                  disabled
                />
                <input
                  className='range'
                  type='range'
                  min='0'
                  max='100'
                  value={swapOnDB? swapOnDB.dropRate * 100: 0}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Premium</h2>
            <div className='input-group'>
              <input 
                placeholder='Premium Rate' 
                value={swapOnDB? `Premium Rate: ${swapOnDB.premiumRate}`: null}
                disabled
              />
              <input 
                placeholder='Premium Price' 
                value={swapOnDB? `Premium Price: ${swapOnDB.premium}`: null}
                disabled
              />
              <div className='input-select'>
                <input 
                  placeholder='Premium Interval' 
                  value={
                    swapOnDB ? 
                    `Premium Interval: ${calculateTimeRemaining (0, swapOnDB.premiumInterval) }` : null
                  }
                  disabled
                />
              </div>
              <input 
                placeholder='Premium Rounds' 
                value={swapOnDB? `Premium Rounds: ${swapOnDB.totalPremiumRounds}`: null}
                disabled
              />
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Liquidation</h2>
            <div className='input-group'>
              <input 
                placeholder='Seller Deposit' 
                value={swapOnDB? `Seller Deposit: ${swapOnDB.sellerDeposit}`: null}
                disabled
              />
              <div className='input-range'>
                <input 
                  placeholder='Liquidated Price' 
                  value={swapOnDB? `Liquidated Price: ${swapOnDB.liquidationPrice}`: null}
                  disabled
                />
                <input
                  className='range'
                  type='range'
                  value={swapOnDB? swapOnDB.liquidationPrice : 0}
                  max={swapOnDB? swapOnDB.initialAssetPrice : 0}
                  min={0}
                  disabled
                />
              </div>
              <input 
                placeholder='Buyer Deposit'
                value={swapOnDB? `Buyer Deposit: ${swapOnDB.buyerDeposit}`: null} 
                disabled
              />
            </div>
          </div>
          <div className='form-section'>
            <div className='button-group'>
              { swapOnDB && userAddress === swapOnDB.buyer.toLowerCase() ?
                <button
                  className='cancel-button'
                  onClick={cancelButtonHandler}
                >
                  Cancel CDS
                </button>
                :
                <></>
              }
              <button
                className='negotiate-button' 
                onClick={acceptButtonHandler}
              >
                Sign CDS
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-11 right-11">
        <ScrollButton />
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default Accept ;