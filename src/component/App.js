import React, {Component} from 'react';
import axios from 'axios';
import '../css/App.css';
import { FaPlus } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = '0efff5a7-fc58-44f0-b9aa-c48640838f85';

class App extends Component {

  async getBreeds() {
      const res = await axios('/breeds');
      return res.data;
  }
  async getCatsImagesByBreed(breed_id, page) {
      const res = await axios('/images/search?breed_ids='+breed_id + "&order=asc&page=" + (page-1) + "&limit="+ 6 );
      // check on console if value 
      console.table(res.data)
      return res.data;
  }

  async loadBreedImages(page) {
    console.log('Load Breed Images:', this.state.selected_breed);
    //const page = this.state.page;

    let breed_images = await this.getCatsImagesByBreed(this.state.selected_breed, page)
    let next_images = await this.getCatsImagesByBreed(this.state.selected_breed, page+1)
    const images = this.state.images.concat(breed_images);
    console.log("[Load Images]",images);
    this.setState({ images: images, nextImages: next_images });
  }

  nextpage = (page) => {
      //load new set of images 
    this.setState({ page: page});
    this.loadBreedImages(page);
  };


  constructor(...args) {

      super(...args);
      this.state = {
        images: [],
        page: 1,
        nextImages: [],
        breeds: [], 
        catpage: [],
        hide: false,
        selected_breed: 0
      };

    this.onBreedSelectChange = this.onBreedSelectChange.bind(this);
    this.catpagedetail = this.catpagedetail.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  async onBreedSelectChange(e) {
    console.log("Breed Selected. ID:",e.target.value)
    await this.setState({
        selected_breed:e.target.value,
        images:[],
        catpage: [],
        page:1
    });
    await this.loadBreedImages(1);
  }
  toggle() {
    this.setState({hide: !this.state.hide});
  }
 catpagedetail(url,origin, name, temperament, description) {
    //load catpage details
      let tempcatpage = this.state.catpage;
      let sampledetails = [
        {
          'url' : url,
          'name' : name,
          'origin' : origin,
          'temperment' : temperament,
          'description' : description
        }];
      tempcatpage = sampledetails;
      this.toggle();
      this.setState({ 
        catpage: tempcatpage
      });

  };

  componentDidMount() {
      if (this.state.breeds.length===0) {
          (async () => {
              try {
                  this.setState({breeds: await this.getBreeds()});
              } catch (e) {
                  //...handle the error...
                  console.error(e)
              }
          })();
      }
  }
  render() {
      return (
        <div className="container">
          
            <div className="row">                 
                <div className= {
                'mycatlist ' +
                (this.state.hide ? 'hide' : '')
            }>
                  <div className="listbreed col-xs-12 col-sm-12">
                    <select value={this.state.selected_breed} 
                            onChange={this.onBreedSelectChange}>
                            <option key={'00'} value={'select'}>Select Bread</option>  
                        {this.state.breeds.map((breed) => <option key={breed.id} value={breed.id}>{breed.name}</option>)}
                    </select>
                  </div>
                  <div className="listcontainer aligncenter">
                      {this.state.images.map((image, index) => <div className="col-xs-12 col-sm-4" key={index}><img className="cat-image" alt="" src={image.url}></img>               
                      <div><Button variant="secondary" size="sm" block className="button" onClick={ () => 
                        this.catpagedetail(image.url, image.breeds[0].origin,image.breeds[0].name, image.breeds[0].temperament, image.breeds[0].description)}>                   
                        View details </Button> </div>
                      </div>)}
                      {this.state.nextImages.length > 0 && (<Button variant="dark" size="lg" className="button centerfix" onClick={() => this.nextpage(this.state.page + 1)}> < FaPlus /> Load More... </Button>)}
                  </div>
                </div>
                <div className= {
                    'mycatpage ' +
                    (this.state.hide ? '' : 'hide')
                  }>
                   {this.state.catpage.map((catpage, index) => 
                   <div className="col-xs-12 col-sm-12" key={index}>
                     <div><Button variant="success"  size="lg" className="button bback" onClick={this.toggle}> Back </Button> </div>
                     <img className="cat-image" alt="" src={catpage.url}></img>
                      <h2>{catpage.name} </h2>
                      <div className="infocatpage">
                        <label className="col-md-2 text-md-right" htmlFor="petName" readOnly>Origin: </label>
                        <div className="col-md-10">{catpage.origin} </div> 
                      </div>
                      <div className="infocatpage">
                        <label className="col-md-2  text-md-right" htmlFor="petName" readOnly>temperment: </label>
                        <div className="col-md-10">{catpage.temperment} </div> 
                      </div>
                      <div className="infocatpage">
                        <label className="col-md-2  text-md-right" htmlFor="petName" readOnly>Description: </label>
                        <div className="col-md-10">{catpage.description} </div>    
                      </div>                                    
                  </div>)}
                </div>
            </div>
            
        </div>
      );
  }
}

export default App;
