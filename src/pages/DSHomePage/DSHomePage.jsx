import React,{useState} from 'react'
import Header from '../../components/Header/Header'
import { Play } from "lucide-react";

const DSHomePage = () => {
    const menuList = [
        {name:'Home',path:'/dsHome'},
        {name:'Products',path:'/dsProduct'},
        {name:'Analysis',path:'/dsAnalysis'},
        {name:'Analysis Report',path:'/dsAnalysisReport'},
        {name:'Data Access',path:'/dsDataAccess'}
    ]
    const [showVideo, setShowVideo] = useState(false);
  return (
    <div>
        <Header menuList={menuList} menuContainerWidth='721px' role='Design Support' defaultActiveMenu='/dsHome'/>
        <div className='container' style={{marginTop:'170px'}}>
            <section className="py-16 text-center">
            <div className="mt-6 relative max-w-3xl mx-auto">
            <div className="bg-gray-200 rounded-lg overflow-hidden cursor-pointer" onClick={() => setShowVideo(true)}>
                <img src="/thumbnail.jpg" alt="Support Video" className="w-full" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Play size={48} className="text-white" />
                </div>
            </div>
            </div>
            {showVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg">
                    <iframe className="w-full h-64 md:h-96" 
                        src="https://www.youtube.com/embed/ZqAHMFP8XXE"
                        title="Support Video"
                        allowFullScreen
                    ></iframe>
                    <button onClick={() => setShowVideo(false)}>Close</button>
                    </div>
                </div>
                )}
        </section>
        </div>
    </div>
  )
}

export default DSHomePage