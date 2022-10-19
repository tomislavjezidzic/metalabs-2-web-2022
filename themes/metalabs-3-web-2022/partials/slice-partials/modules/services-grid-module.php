<section class="o-section o-section--with-padding">
    <div class="o-container c-services-grid-module">
        <ul class="c-services-grid-module__list">
			<?php for ( $i = 0; $i < 8; $i ++ ) { ?>
                <li class="c-services-grid-module__item">
					<?php get_partial( 'slice-partials/components/services-card' ); ?>
                </li>
			<?php } ?>
        </ul>
    </div>
</section>
