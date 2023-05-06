import Swal from 'sweetalert2';

export class AlertHelper {

    loadingAlert() {
        Swal.fire(
            {title: 'Espere', text: 'Obteniendo informacion', icon: 'info', allowOutsideClick: false}
        )
        Swal.showLoading();
    }
    Login() {
        Swal.fire(
            {title: 'Espere', text: 'Iniciando sesión', icon: 'info', allowOutsideClick: false}
        )
        Swal.showLoading();
    }

    warningAlert(TITLE : string, TEXT : string) {
        Swal.fire({title: TITLE, text: TEXT, icon: "warning"})
    }

    createAlert(TEXT : string) {
        Swal.fire({title: "Elemento creado!", text: TEXT, icon: "success"});
    }

    updateAlert(TEXT : string) {
        Swal.fire({title: "Elemento actualizado!", text: TEXT, icon: "success"});
    }

    deleteAlert(TEXT : string) {
        Swal.fire({title: "Elemento eliminado!", text: TEXT, icon: "success"});
    }

    errorAlert(TEXT : string) {
        Swal.fire({title: "Ah ocurrido un error", text: TEXT, icon: "error"})
    }

    error_mail(Text:string){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: Text,
        })
    }

    error_small(Text:string){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: Text,
        })
    }
    success_small(Text:string){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: Text,
        })
    }

}
