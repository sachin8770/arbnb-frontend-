import { Addhome } from '../controllers/Addhomecontroller';
import { useDispatch, useSelector } from "react-redux";
import { addHomeSuccess, fetchHomesError } from '../store/HomeSlice';
import { resetFetchdone ,fetchHomesStart} from '../store/HomeSlice';
import { useNavigate } from "react-router-dom";


function AddHome() {
      const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.homes);
   const submithandeler = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

 try {
            dispatch(fetchHomesStart());
  const addhomedata = await Addhome(formData);
  console.log(addhomedata);
      dispatch(addHomeSuccess(addhomedata));
    dispatch(resetFetchdone());
       navigate("/");
} catch (e) {
  dispatch(fetchHomesError());
  alert(e.message);
}

};
    return (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow border">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Home</h1>

            <form onSubmit={submithandeler} method="POST" className="space-y-5">
                <input
                    type="text"
                    name="name"
                    placeholder="Home name"
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-300"
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-300"
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-300"
                />

                <input
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    step="0.1"
                    min="0"
                    max="5"
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-300"
                />

                <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-300"
                />

                <button 
                    type="submit"
                     disabled={!loading?false:true}
                    className="w-full bg-rose-500 text-white py-3 rounded-xl font-semibold hover:bg-rose-600"
                >
                   {!loading?"Add Home":"AddingHome.."}   {/*coderabbit tesa1  */}
                   {/* commentt */}
                </button>
            </form>
        </div>
    );
}

export default AddHome;