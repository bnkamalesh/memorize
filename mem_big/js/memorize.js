var start = false,showItems = false,difficulty = 0;
var nextCell, number = 0;
var cellValues,time = 0, setTimer;
var cells;

function getRdmCell() {
	var c = cells[Math.floor(Math.random()*cells.length)];
	cells.splice(jQuery.inArray(c,cells), 1);
	return c;
}

function updateNextCell() {
	if(number < (difficulty)) {
		return 'cell'+(jQuery.inArray(++number, cellValues));
	}
	return false;
}

function checkCells(clickedCell) {
	if( start == true) {
		
		$('#'+clickedCell).html(cellValues[clickedCell.replace('cell', '')]);
		
		if(clickedCell != nextCell) {
			start = false;
			$('#message').html('You lost, sorry :(');
			$('#'+clickedCell).removeClass("correct");
		}
		else {
			$('#'+nextCell).addClass("correct");
			nextCell = updateNextCell();

			if( nextCell === false) {
				$('#message').html('You won!');
				start = false;
			}
		}
	}
	else{
		$('#message').html('No game in progress.');
	}
	return false;
}

function showBlocks(limit) {
	if (showItems == false) {
		showItems = true;
		for(var i = 0; i < 9; i++) {
			$('#cell'+i).html(cellValues[i]);
		}
		var t = setTimeout('showBlocks('+limit+')',limit*150);
	}
	else {
		clearTimeout(t);
		$('.cell').html('');

		timer();
		$('.cell').bind('click', function() {
			if( !$(this).hasClass('activeCell') && start ) {
				$(this).addClass('activeCell');
				checkCells($(this).attr('id'));
			}
		});

		showItems = false;
	}
	return false;
}

function startMemorize() {
	$('.cell').unbind('click');

	if( start == false) {
		showItems = false;
		number = 0;
		time = 0.00;
		cells = new Array(0,1,2,3,4,5,6,7,8);
		cellValues = new Array();

		difficulty = $("input:radio[name=difficulty]:checked").val(); //get this from user

		$('.cell').html('');
		$('.cell').removeClass('activeCell');
		$('#message').html('Game in progress');
	
		/* Generate cellValues according to difficulty ( limit ) */
			for( var i = 0 ; i < difficulty; i++) {
				cellValues[ getRdmCell() ] = i+1;
			}
		/*****************************************************/
	
		showBlocks(difficulty);
		nextCell = updateNextCell();
		start = true;
	}
	else{
		$('#message').html('A game is already in progress.');
	}


	$("input:radio[name=difficulty]").change(function() {
			if(start == true) {
				$('#message').html('Cannot set difficulty while game in progress.');
			}
	});

	return false;
}

function timer() {
	if(start == true ) {
		time = time + 0.01;
		$('#showTime').html('');
		$('#showTime').html("Time: "+time.toFixed(2)+'s');
		setTimer = setTimeout("timer()",10);
	}
	return false;
}

function resetMemorize() {
	$('.cell').unbind('click');
	start = false;
	showItems = false;
	number = 1;
	time = 0.00;
	$('#showTime').html("Time: "+time.toFixed(2)+'s');
	$('.cell').html('');
	$('.cell').removeClass('activeCell');
	$('#message').html('');
	return false;
}