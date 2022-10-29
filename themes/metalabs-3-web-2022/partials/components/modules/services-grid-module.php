<?php
/**
 *
 * @var string $service_cards
 *
 */

if ( ! empty( $service_cards ) ) { ?>
    <section class="o-section o-section--with-padding">
        <div class="o-container c-services-grid-module">
            <ul class="c-services-grid-module__list">
				<?= wp_kses_post( $service_cards ); ?>
            </ul>
        </div>
    </section>
<?php } ?>