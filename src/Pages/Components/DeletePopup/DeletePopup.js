import Swal from "sweetalert2";
const DeletePopup = ({deleteFun, setDeletePopup}) => {
  Swal.fire({
    title: "Are you sure to Delete!",
    icon: "info",
    html: "",
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: 'Ok',
  }).then(res => {
    if (res.isConfirmed) {
        deleteFun();
        setDeletePopup(false)
    }else{
        setDeletePopup(false)
    }
  })
  ;
};

export default DeletePopup;
