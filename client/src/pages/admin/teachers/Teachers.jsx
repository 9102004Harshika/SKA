import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { toast } from "../../../components/use-toast";
import { Loader2, Plus, Search } from "lucide-react";

const Teachers = () => {
  const [instructors, setInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}api/instructor/get/`
        );
        setInstructors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching instructors:", error);
        toast({
          title: "Error",
          description: "Failed to load instructors. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const filteredInstructors = instructors.filter((instructor) =>
    instructor.user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (instructorId) => {
    navigate(`/admin/teachers/${instructorId}`);
  };

  const handleAddInstructor = () => {
    navigate("/admin/teachers/new");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wide font-header">
            Instructors
          </h1>
        </div>
        <Button onClick={handleAddInstructor}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Instructor
        </Button>
      </div>

      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredInstructors.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">No instructors found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstructors.map((instructor) => (
            <div
              key={instructor._id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleViewDetails(instructor._id)}
            >
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={instructor.photo || "/placeholder-avatar.png"}
                      alt={instructor.user.fullName}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-avatar.png";
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {instructor.user.fullName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {instructor.designation || "Instructor"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <p className="text-gray-600 line-clamp-2">
                    {instructor.bio || "No bio available"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Experience:</span>{" "}
                    {instructor.experience || "N/A"} years
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teachers;
