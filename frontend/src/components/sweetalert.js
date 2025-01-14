import Swal from 'sweetalert2';

const SweetAlertComponent = () => {

    const showSuccessAlert = (title, text) => {
        Swal.fire({
            title: title || 'Success!',
            text: text || 'Operation completed successfully.',
            icon: 'success',
            showConfirmButton: false, // No confirmation button
            timer: 1500, // Auto-close after 1.5 seconds
        });
    };

    const showWarningAlert = (title, text) => {
        Swal.fire({
            title: title || 'Warning!',
            text: text || 'Are you sure about this?',
            icon: 'warning',
            confirmButtonText: 'Proceed',
        });
    };

    const showErrorAlert = (title, text) => {
        Swal.fire({
            title: title || 'Error!',
            text: text || 'Something went wrong.',
            icon: 'error',
            confirmButtonText: 'Try Again',
        });
    };

    const showInfoAlert = (title, text) => {
        Swal.fire({
            title: title || 'Info',
            text: text || 'Here is some information for you.',
            icon: 'info',
            confirmButtonText: 'Got it',
        });
    };

    const showQuestionAlert = (title, text) => {
        return Swal.fire({
            title: title || 'Are you sure?',
            text: text || 'Do you want to proceed?',
            icon: 'question',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
        });
    };
    const showConfirmationAlert = (title, text, onConfirm, onCancel) => {
        Swal.fire({
            title,
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                onConfirm();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                onCancel();
            }
        });
    };

    return {
        showQuestionAlert,
        showSuccessAlert,
        showWarningAlert,
        showErrorAlert,
        showInfoAlert,
        showQuestionAlert,
        showConfirmationAlert
    };

};

export default SweetAlertComponent;
