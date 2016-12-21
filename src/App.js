import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
// import categories from './Categories';


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
    })
  }

  render() {



    const categorytItems = this.state.categories.map((category) => {
      return (
        <Button bsStyle="primary" key={category.category} >{category.category} </Button>
      );
    });

    const dataItems = this.state.data.map((item) => {
      return (
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 item" key={item.id}>
          <div class="thumbnail">
          <img className="img-responsive thumbnail" src={item.url} width="250" height="200"  alt=""/>
           <div class="caption">
          <h4>{item.name}</h4>
           <h5>{item.characteristics[0]}</h5>
           <h5>{item.characteristics[1]}</h5>
           <h5>{item.characteristics[2]}</h5>
        </div>
      </div>
    </div>
    );
  });


    return (
      <div>
        <div className="container">
          <div className="text-center">
            <div className="btn-group buttons">
              {categorytItems }
            </div>
          </div>

          <div className="row rows">

              {dataItems}
          
          </div>
        </div>
      </div>

    );
  }
}
export default App;
