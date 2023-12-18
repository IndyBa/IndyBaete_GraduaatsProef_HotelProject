import { getMembers, deleteMember } from "../api/member";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { MdDeleteOutline , MdEdit } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const MemberList = ({ handleAddMemberOpen, handleUpdateMemberOpen, showAddMemberMenu, showUpdateMemberMenu, customerId }) => {
  const { data, isLoading, error, isError, refetch} = useQuery({
    queryKey: ["getMembers"],
    queryFn: () => getMembers(customerId),
    retry: false,
  });

  const { mutate } = useMutation({
    mutationKey: ["deleteMember"],
    mutationFn: (data) => deleteMember(data.customerId, data.memberId),
  });

  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddMemberMenu, showUpdateMemberMenu, customerId])

  const handleDelete = (memberId) => {
    const confirm = window.confirm(
      `Are your sure you want to delete this Member? (Member Id: ${memberId})`
    );
    if (confirm) {
      mutate({customerId: customerId, memberId: memberId}, {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          alert(error);
          refetch();
        },
      });
    }
  };

  return (
    <div className="container">
      <div className="crud shadow-lg p-3 bg-body rounded">
        <div className="row">
          <div className="col-sm-9 text-gred">
            <h3>Members:</h3> <p className="text-xs mr-4">(changes to members will automatically be saved)</p>
          </div>
          <div className="col-sm-3 mt-3 mb-4 text-gred d-flex justify-content-end">
            <button onClick={handleAddMemberOpen} className="btn btn-success">
              Add Member
            </button>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered mb-0">
              <thead>
                <tr>
                  <th className="w-12">Id</th>
                  <th>Name</th>
                  <th className="w-32">Birthday</th>
                  <th className="w-14">Actions</th>
                </tr>
              </thead>
              {!(isLoading || isError) && (
                <tbody>
                  {data &&
                    data.map((member) => (
                      <tr key={member.id}>
                        <td>{member.id}</td>
                        <td>{member.name}</td>
                        <td>{member.birthDay}</td>
                        <td className="space-x-2">
                          <button
                            onClick={() => handleUpdateMemberOpen(member.id)}
                          >
                            <MdEdit fontSize="1.5em"/>
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
                          >
                            <MdDeleteOutline fontSize="1.5em"/>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
        {(isLoading || isError) && (
          <div className="flex items-center">
            <h2 className="text-center mx-auto">
              {isLoading
                ? "Loading..."
                : error.response == null ? "Error: Couldn't connect to the server" : 
                error.response.status === 404
                ? "No Members Found"
                : `${error.message}`}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberList;
