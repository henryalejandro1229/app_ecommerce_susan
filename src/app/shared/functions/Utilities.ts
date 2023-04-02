import swal from 'sweetalert2';

export function showNotifySuccess(title: string, message: string) {
  return swal.fire({
    // position: 'bottom-right',
    // timer: 2500,
    // type: 'success',
    // titleText: title,
    // text: message,
    // showCloseButton: false,
    // showConfirmButton: false,
    position: 'top-end',
    icon: 'success',
    title: title,
    showConfirmButton: false,
    timer: 1500,
    backdrop: `
    rgba(0,0,123,0.4)}
    left top
    no-repeat`,
  });
}

export function showNotifyWarning(title: string, message: string) {
  return swal.fire({
    position: 'top-end',
    icon: 'warning',
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
}

export function showNotifyError(title: string, message: string) {
  return swal.fire({
    position: 'top-end',
    icon: 'error',
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
}

export function showSwalSuccess(title: string, message: string) {
  return swal.fire({
    icon: 'success',
    titleText: title,
    text: message,
    showCloseButton: true,
  });
}

export function showSwalError(
  title: string,
  message: string
) {
  return swal.fire({
    icon: 'error',
    titleText: title,
    text: message,
    showCloseButton: true,
  });
}

export function showSwalWarning(
  title = 'Error al realizar la solicitud',
  message: string
) {
  return swal.fire({
    icon: 'warning',
    titleText: title,
    text: message,
    showCloseButton: true,
  });
}

export function showModalConfirmation(title: string, message: string) {
  return swal.fire({
    icon: 'question',
    titleText: title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: '#e30052',
    cancelButtonColor: '#808080',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  });
}
