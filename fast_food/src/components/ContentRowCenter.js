import React from 'react';
import LastMovieInDb from './LastMovieInDb';
import ListProducts from './data/listProducts';

function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastMovieInDb />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <ListProducts />

        </div>
    )
}

export default ContentRowCenter;