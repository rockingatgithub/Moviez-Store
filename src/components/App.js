import React from 'react';
import { connect } from 'react-redux';
import { data as moviesList} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies, setShowFavourites} from '../actions';
  
class App extends React.Component {
  componentDidMount(){

    //make api call 
    //dispatch action

    this.props.dispatch(addMovies(moviesList));

  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);

    if(index !== -1){
      return true;
    }
    return false;
  }
  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  }

  render(){

    const {movies, search} = this.props;
    const { list, favourites = [], showFavourites = [] } = movies;
    console.log('RENDER', this.props);

    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar search = {search}/>
        <div className= "main">
          <div className= "tabs">
            <div className= {`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className= {`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>

        <div className ="list">
          {
            displayMovies.map((movie) => (
              <MovieCard 
              movie = {movie} 
              key={movie.imdbID} 
              dispatch = {this.props.dispatch} 
              isFavourite = {this.isMovieFavourite(movie)}
              />
            ))
          }
        </div>
        {displayMovies.length === 0 ? <div className="no-movies">No movies to display</div> : null}
        </div>
      </div>
    );
}
}

// class AppWraper extends React.Component{
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store = {store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }

function callback(state) {
  return {
    movies: state.movies,
    search: state.movies,
  };
}
const connectedComponent = connect(callback)(App);
export default connectedComponent;
