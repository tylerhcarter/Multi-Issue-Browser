<?php

abstract class Column{

	public $title, $color, $text_color, $rows;

	protected $base_class = 'column';
	protected $header_class = 'column-header';
	protected $item_class = 'item';

	public function __construct( $title = '', $color = '', array $rows = array() ){
		$this->title = $title;

		if( empty( $color ) )
			$color = generate_color(md5($title) + $title);

		$this->color = $color;

		$this->text_color = getContrast($color);

		$this->rows = $rows;
	}

	public function add_row( $row ){
		$this->rows[] = $row;
	}

	public function display(){

		echo '<div class="' . $this->base_class . '">';
		$this->display_header();
		$this->display_rows();
		echo '</div>';

	}

	protected function display_header(){
		echo '<div class="' . $this->header_class . '" style="background-color: ' . $this->color . '; color: '.$this->text_color.';">';
		echo $this->title;
		echo '</div>';
	}

	protected function display_rows(){

		foreach( $this->rows as $row ){
			echo '<div class="issue">';
			$this->display_row( $row );
			echo '</div>';
		}

	}

	protected abstract function display_row( $row );

}