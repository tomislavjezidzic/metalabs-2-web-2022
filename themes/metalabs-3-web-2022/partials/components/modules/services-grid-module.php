<?php
/**
 *
 * @var string $service_cards
 * @var string $anchor_id
 *
 */

if ( ! empty( $service_cards ) ) {
	$anchor = ! empty( $anchor_id ) ? 'id=' . $anchor_id : '';
    ?>
    <section class="o-section o-section--with-padding" <?= esc_attr( $anchor ); ?> data-anchor-target="<?= $anchor_id; ?>">
        <div class="o-container c-services-grid-module">
            <ul class="c-services-grid-module__list">
				<?= wp_kses_post( $service_cards ); ?>
            </ul>
        </div>
    </section>
<?php } ?>
