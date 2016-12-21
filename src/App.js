import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

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
    console.log(this.state.categories)
    return (
      <div className="container">
      <div className="text-center">
        <div className="btn-group buttons">
          <button className="btn btn-default btn-lg topbutton">ALL</button>
          <button className="btn btn-default btn-lg topbutton">MEAT</button>
          <button className="btn btn-default btn-lg topbutton">FISH</button>
          <button className="btn btn-default btn-lg topbutton">VEGETABLES</button>
          <button className="btn btn-default btn-lg topbutton">FRUIT</button>
        </div>
      </div>
      <div className="row rows">
         <div className="col-md-3 col-sm-6 col-xs-12 imgnew">	<img className="img-responsive thumbnail" src="https://raw.githubusercontent.com/Stas-Buzunko/ingredient-template/50c1f56582e84edbaf8b81b2fc5f2eee552a16fd/public/img/1.jpg" width="250" height="200"  alt=""/>
        <h4>Name</h4> <h5>Tags</h5></div>
         <div className="col-md-3 col-sm-6 col-xs-12 imgnew">	<img className ="img-responsive thumbnail" src="https://raw.githubusercontent.com/Stas-Buzunko/ingredient-template/50c1f56582e84edbaf8b81b2fc5f2eee552a16fd/public/img/1.jpg" width="250" height="200"  alt=""/>  <h4>Name</h4> <h5>Tags</h5></div>
          <div className="col-md-3 col-sm-6 col-xs-12 imgnew">	<img className ="img-responsive thumbnail" src="https://raw.githubusercontent.com/Stas-Buzunko/ingredient-template/50c1f56582e84edbaf8b81b2fc5f2eee552a16fd/public/img/1.jpg" width="250" height="200"  alt=""/> <h4>Name</h4> <h5>Tags</h5></div>
            <div className="col-md-3 col-sm-6 col-xs-12 imgnew">	<img className ="img-responsive thumbnail" src="https://raw.githubusercontent.com/Stas-Buzunko/ingredient-template/50c1f56582e84edbaf8b81b2fc5f2eee552a16fd/public/img/1.jpg" width="250" height="200"  alt=""/> <h4>Name</h4> <h5>Tags</h5></div>
            </div>
              <div className="row rows">
                <div className="col-md-3 col-sm-6 col-xs-12  imgnew">	<img className ="img-responsive thumbnail" src="https://raw.githubusercontent.com/Stas-Buzunko/ingredient-template/50c1f56582e84edbaf8b81b2fc5f2eee552a16fd/public/img/1.jpg" width="250" height="200"  alt=""/> <h4>Name</h4> <h5>Tags</h5></div>
                  <div className="col-md-3 col-sm-6 col-xs-12  imgnew">	<img className ="img-responsive thumbnail" src="https://raw.githubusercontent.com/Stas-Buzunko/ingredient-template/50c1f56582e84edbaf8b81b2fc5f2eee552a16fd/public/img/1.jpg" width="250" height="200"  alt=""/> <h4>Name</h4> <h5>Tags</h5></div>
                    <div className="col-md-3 col-sm-6 col-xs-12  imgnew">	<img className ="img-responsive thumbnail" src="https://raw.githubusercontent.com/Stas-Buzunko/ingredient-template/50c1f56582e84edbaf8b81b2fc5f2eee552a16fd/public/img/1.jpg" width="250" height="200"  alt=""/> <h4>Name</h4> <h5>Tags</h5></div>
                      <div className="col-md-3 col-sm-6 col-xs-12  imgnew">	<img className ="img-responsive thumbnail" src="https://raw.githubusercontent.com/Stas-Buzunko/ingredient-template/50c1f56582e84edbaf8b81b2fc5f2eee552a16fd/public/img/1.jpg" width="250" height="200"  alt=""/> <h4>Name</h4> <h5>Tags</h5></div>
                      </div>
                    </div>
    );
  }
}

export default App;
