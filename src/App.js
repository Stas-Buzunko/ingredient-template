import React, { Component } from 'react';
import firebase from 'firebase';
// import logo from './logo.svg';
import './App.css';

import Category from './Category';
import Data from './Data';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      data: []
    }
  }
  componentDidMount() {
    const storageRef = firebase.storage().ref('images/ingredients/');
    // fetch data from /data
    firebase.database().ref('data').once('value', (snapshot => {
      this.fetchCategories()
      const data = snapshot.val();
      if (data !== null) {
        this.setState({data: []});
        data.forEach(item => {
          storageRef.child(`${item.id}.jpg`).getDownloadURL()
          .then(url => this.setState({
            data: [
              ...this.state.data,
              {
                ...item,
                url
              }
            ]
          }))
        })
      }
    }))
  }



  fetchCategories() {
     firebase.database().ref('categories').on('value', snapshot => {
       const categories = snapshot.val();
       if (categories !== null) {
         this.setState({categories: []});
         categories.forEach(category => {
           firebase.database().ref('data')
           .orderByChild('category')
           .equalTo(category)
           .once('value', snapshot => {
             const items = snapshot.val();
             const length = items !== null ? Object.keys(items).length : 0;
             this.setState({
               categories: [
                 ...this.state.categories,
                 {category, length}
               ]
             })
           })
         })
       }
     }).then(() =>this.buttonAll())
   }

   buttonAll(){
     const numAll = this.state.categories.reduce((accumulator, item) => {
       return accumulator += item.length;
     }, 0);

     console.log(numAll)

     this.setState({
       categories: [
         ...this.state.categories,
        {category: 'All', length: numAll}
       ]
     }
   );

 }



 render() {

   console.log(this.state.categories);

   return (
     <div>
       <div className="container">
         <div className="text-center">
           <div className="btn-group buttons">
             <Category categories={this.state.categories}/>
           </div>
         </div>

         <div className="row rows">
           <Data data={this.state.data}/>
         </div>
       </div>
     </div>

   );
 }
}


export default App;
