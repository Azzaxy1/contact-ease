const confirmDelete = (e) => {
  e.preventDefault();

  swal({
    title: "Apakah Anda yakin?",
    text: "Setelah dihapus, Anda tidak akan dapat memulihkan contact ini!",
    icon: "warning",
    buttons: {
      cancel: "Batal",
      confirm: {
        text: "Ya, hapus!",
        value: true,
        visible: true,
        className: "btn-danger",
        closeModal: true,
      },
    },
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      // Jika dikonfirmasi, kirim form secara manual
      e.target.form.submit();
    }
  });
};
