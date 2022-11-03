<?php
/**
 *
 * @var string $anchor_id
 * @var string $side_text
 * @var string $title
 * @var string $description
 * @var array $model
 *
 */

$anchor = ! empty( $anchor_id ) ? 'id=' . $anchor_id : '';
?>
<div class="c-contact-wrapper" <?= esc_attr( $anchor ); ?>>
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

		<?php if ( ! empty( $model ) && ! empty( $model['url'] ) ) { ?>
            <div class="c-contact-wrapper__model js-contact-model-wrapper"
                 data-model="<?= esc_url( $model['url'] ); ?>"></div>
		<?php } ?>
    </div>
    <div class="o-container">
        <div class="c-contact-wrapper__extra-big-text u-a4 u-fw-300 u-uppercase">
<!--            todo: josip pls make acf here -->
            <p class="js-flickering-text c-flickering-text">
                <a href="mailto:hello@metalabs3.com"><b>hello@metalabs3.com</b></a>
            </p>
        </div>
    </div>
</div>
