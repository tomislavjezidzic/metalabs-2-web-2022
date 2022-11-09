<?php
/**
 *
 * @var string $image
 * @var string $title
 * @var string $description
 *
 */
?>
<article class="c-services-card">
	<?php if ( ! empty( $image ) ) { ?>
        <div class="c-services-card__graphic">
			<?= wp_kses_post( $image ); ?>
        </div>
	<?php } ?>
    <h3 class="c-services-card__title u-b2 u-fw-500 u-uppercase">
		<?= esc_html( $title ); ?>
    </h3>
	<?php if ( ! empty( $description ) ) { ?>
        <p class="c-services-card__description u-b1 u-fw-300">
			<?= esc_html( $description ); ?>
        </p>
	<?php } ?>

</article>
