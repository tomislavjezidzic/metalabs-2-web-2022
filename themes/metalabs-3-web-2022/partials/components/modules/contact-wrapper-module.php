<?php
/**
 *
 * @var string $side_text
 * @var string $title
 * @var string $description
 * @var array $model
 *
 */
?>
<div class="c-contact-wrapper">
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
