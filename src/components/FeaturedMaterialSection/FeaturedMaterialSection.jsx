import React, { useEffect ,useState} from 'react'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'
import axiosInstance from '../../api/axiosInstance'
import { toast } from 'sonner'

const FeaturedMaterialSection = ({id}) => {

  const [featuredMaterials, setFeaturedMaterials] = useState([]);

  useEffect(() => {
    const getFeaturedMaterials = async () => {
      try {
        const response = await axiosInstance.get('auth/get-featured-material');
        if (response.status === 200) {
          setFeaturedMaterials(response.data.featuredMaterials);
        }
      } catch (error) {
        toast.error('Error while fetching featured materials');
      }
    };

    getFeaturedMaterials();
  }, []);
  return (
    <div className='container text-light' style={{marginTop:'83px'}} id={id}>
        <h2>Featured Materials</h2>
        <div className='d-flex gap-5 flex-wrap mt-5 '>
                {
                    featuredMaterials.map((item)=>(
                        <FeaturedProduct key={item._id} productName={item.productName} materialType={item.materialType} materialSpecification={item.materialSpecification} qualityString={item.qualityString} />
                    ))
                }
        </div>

    </div>
  )
}

export default FeaturedMaterialSection