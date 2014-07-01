jQuery(document).ready(function(){

    jQuery(".stripe-error-message").hide();

    Stripe.setPublishableKey(Drupal.settings.stripe_js_pk);
    var form = jQuery('.uc-cart-checkout-form');

    stripeResponseHandler = function(status, response) {
        var token;
        if (response.error) {
            jQuery(".stripe-error-message .message").text(response.error.message);
            jQuery(".stripe-error-message").show();
            form.find("#edit-continue").attr("disabled", false);
        } else {
            token = response.id;
            jQuery("input[name=\"panes[payment][details][stripeToken]\"]").val(token);
            form.find("#edit-continue").attr("disabled", false);

            jQuery('#edit-continue').click();
        }
    };

    form.submit(function(event) {
        event.preventDefault();

        if(form.find('input[name="panes[payment][payment_method]"][value="stripe_js"]:checked').length !== 0){
            form.find("#edit-continue").attr("disabled", true);
            Stripe.card.createToken(form, stripeResponseHandler);
        } else {
            jQuery('#edit-continue').click();
        }
    });
});
