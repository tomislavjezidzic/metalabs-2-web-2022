<?php
/**
 *
 * @var string $side_text
 * @var string $anchor_id
 * @var string $title
 * @var string $description
 *
 */

$anchor = ! empty( $anchor_id ) ? 'id=' . $anchor_id : '';
?>
<section class="o-section o-section--with-padding" <?= esc_attr( $anchor ); ?>>
    <div class="o-container c-text-module">
        <div class="c-text-module__inner">
			<?php if ( ! empty( $side_text ) ) { ?>
                <span class="c-text-module__side-text u-b3 u-serif">
					<?= esc_html( $side_text ); ?>
                </span>
			<?php } ?>
			<?php if ( ! empty( $title ) ) { ?>
                <h2 class="c-text-module__title u-a2 u-fw-500 u-uppercase js-flickering-text c-flickering-text">
					<?= wp_kses_post( $title ); ?>
                </h2>
			<?php } ?>
			<?php if ( ! empty( $description ) ) { ?>
                <p class="c-text-module__description u-b0">
					<?= esc_html( $description ); ?>
                </p>
			<?php } ?>
        </div>
    </div>
</section>
