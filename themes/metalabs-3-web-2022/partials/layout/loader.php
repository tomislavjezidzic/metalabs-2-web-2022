<?php

use metalabs3Web2022\acf\ACFProvider;

$acf_provider  = ACFProvider::get_instance();
$loader        = $acf_provider->get_option_field('loader_-_animation');
$loader_mobile = $acf_provider->get_option_field('loader_-_animation_mobile');


if (!empty($loader['url'])) { ?>
    <div class="c-loader js-loader">
        <div class="c-loader__animation-wrapper js-loader-animation-wrapper">
            <div class="c-loader__animation js-loader-animation"
                 data-loader="<?= esc_url($loader['url']); ?>"
                 data-loader-mobile="<?= esc_url($loader_mobile['url']); ?>">

            </div>
        </div>
    </div>
<?php } ?>
