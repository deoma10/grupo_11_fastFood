import React from "react";
const port = process.env.PORT || 4000


function GenresInDb() {
 const callApiProducts = async ()=>{
    try{
      const dataProducts = await fetch('http://localhost:4000/api/products')
      const result = await dataProducts.json()
      return result
    }catch(e){
      console.log(e);
    }
  }
  console.log(callApiProducts());
  return (
      <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Hamburguesas
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card bg-dark text-white shadow">
                <div className="card-body">Acción</div>
                <div className="card-body">Acción</div>
                <div className="card-body">Acción</div>
                <div className="card-body">Acción</div>
                <div className="card-body">Acción</div>
                <div className="card-body">Acción</div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
  );
  
}


export default GenresInDb;
