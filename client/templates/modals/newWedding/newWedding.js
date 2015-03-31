AutoForm.hooks({
  'weddings-new-form': {
    onSuccess: function (operation, result, template) {
      IonModal.close();
      IonKeyboard.close();
      Router.go('weddings.show', {_id: result});
    }
  }
});
