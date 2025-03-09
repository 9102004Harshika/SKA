import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useUpdateCourse=()=>{
    const { id } = useParams();
    const [course, setCourse] = useState({
          courseTitle: "",
            courseDescription: "",
            courseImage: "",
            originalPrice: "",
            discountedPrice: "",
            aboutCourse: "",
            moduledescription: "",
            demoVideo: "",
            studentCount: "",
            lastUpdated: "",
            classFor: "",
            board: "",
            subject: "",
            stream: "",
            category: "",
            keyFeatures: [],
            topicsCovered: [],
            modules: [{ name: "", estimatedTime: "", videoLink: "" }],
            instructor: "",
            notes: [],
            quizzes: [],
      });
    
      useEffect(() => {
        const fetchNoteDetails = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5000/api/courses/${id}`
            );
            setCourse(response.data);
          } catch (error) {
            console.error("Error fetching note details:", error);
          }
        };
    
        fetchNoteDetails();
      }, [id]);
     const deleteFile=async(Url)=>{
        try{
          await axios.post("http://localhost:5000/api/files/deleteVideoUrl", {
            url: Url,
            course:course._id
          });
    
        }
        catch{
            console.log("Error occured during deletion of file")
        }
    
      }
      return { course, setCourse,deleteFile};
}
export default useUpdateCourse