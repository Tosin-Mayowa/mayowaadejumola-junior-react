import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo'; 
import Logoicon from '../Image/svg3.png';
import Logoicon2 from '../Image/svg19.png';
import Logoicon3 from '../Image/svg21.png';
import ArrowUpIcon from '../Image/ArrowUp.png';
import ArrowDownIcon from '../Image/ArrowDown.png';
import './NavBar.css'
import Cart from '../Image/cart.png';
import Dot from '../Image/dot.png';


const GET_CATEGORIES = gql`
query {
    categories{
      name  
      products {
      prices{
        currency{
          label
          symbol
        }
      }
    }
  }
  }
 `


class NavBar extends React.Component{
   constructor(props){
    super(props);
    this.state={
        isClicked:false
    }
   }
    
    render(){
        return(
        <>
           <Query query={GET_CATEGORIES}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error </div>;
              
         
             return    (
                <>
              <nav className='Nav'>
                <ul className='ListParent'>
              {
                data.categories.map(cat=> <li className='List'> {cat.name}</li>)
              }
               </ul>
               <div>
                <img src={Logoicon} alt="" />
                <div className='Logoicon2'>
                    <img src={Logoicon2} alt="" />
                    <div className='Logoicon3'>
                        <img src={Logoicon3} alt="" />
                    </div>
                </div>
               </div>
               <div className='Cart'>
                <div>
                   <p>
                    $
                   {this.state.isClicked? <img src={ArrowUpIcon} alt="" className='ArrowIcon'/>:<img src={ArrowDownIcon} alt="" className='ArrowIcon'/>} 
                    </p>   
              
<ul>
    <li><button>$ USD</button></li>
       <li> <button>£ GBP</button></li>
       <li><button>¥ JPY</button></li>
       <li> <button>₽ RUB</button></li>
</ul>
</div>
<div className='NavCart'>
  <div className=''>
  <img src={Cart} alt='cart' />
  <div className='Dot'>
  <img src={Dot} alt='dot' /> 
  <img src={Dot} alt='dot' className='RDot' />
  </div>
  </div>
</div>
</div>


              </nav>
    
              </>
             );
         
              
            }}
          </Query>
          </>
          )
          }
    
    
    
    }

    export default NavBar;