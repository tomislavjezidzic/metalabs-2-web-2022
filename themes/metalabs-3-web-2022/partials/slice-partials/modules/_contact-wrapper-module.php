<div class="c-contact-wrapper">
    <div class="c-contact-wrapper__contact">
        <?php
        get_partial('slice-partials/modules/_text-module', [
            'side_text'   => 'CONTACT',
            'title'       => 'CONTACT <b>Us</b>',
            'description' => 'Don’t get left behind in the Web3 Renaissance. Start building your work of art today.',
        ]);
        ?>
    </div>

    <div class="c-contact-wrapper__model js-contact-model-wrapper"  data-model="<?= bu( "models/slider-model-3.glb" ) ?>"></div>
</div>
