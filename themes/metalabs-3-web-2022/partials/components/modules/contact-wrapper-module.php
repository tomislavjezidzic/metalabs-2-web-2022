<?php
/**
 *
 * @var string $anchor_id
 * @var string $side_text
 * @var string $title
 * @var string $description
 * @var array $model
 * @var string $email
 *
 */

$anchor = ! empty( $anchor_id ) ? 'id=' . $anchor_id : '';
?>
<div class="c-contact-wrapper" <?= esc_attr( $anchor ); ?> data-anchor-target="<?= $anchor_id; ?>">
    <div class="c-contact-wrapper__inner">
        <div class="c-contact-wrapper__contact">
			<?php
			get_partial( 'components/modules/text-module', array(
				'side_text'   => $side_text,
				'title'       => $title,
				'description' => $description,
			) );
			?>
        </div>
    </div>
	<?php if ( ! empty( $model ) && ! empty( $model['url'] ) ) { ?>
        <div class="c-contact-wrapper__model js-contact-model-wrapper"
             data-model="<?= esc_url( $model['url'] ); ?>"></div>
	<?php } ?>
	<?php if ( ! empty( $email ) ) { ?>
        <div class="o-container">
            <div class="c-contact-wrapper__extra-big-text">
                <p class="u-a4 u-serif u-fw-300 u-uppercase js-mail-reveal">
					<?= wp_kses_post( $email ); ?>
                </p>
            </div>
        </div>
	<?php } ?>
</div>
