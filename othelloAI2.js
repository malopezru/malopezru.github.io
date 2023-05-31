

class AgentIvan {
    constructor() { }

    init(color, board, time = 20000) {
        this.color = color
        this.time = time
        this.size = board.length
    }

    // Must return a list representing the row and column to put a piece
    // row column
    // | |
    compute(board, time) { return [0, 0] }
}

/*
* A class for board operations (it is not the board but a set of operations over it)
*/
class BoardIvan {
    constructor() { }
    // Initializes a board of the given size. A board is a matrix of size*size of characters ' ', 'B', or 'W'
    init(size) {
        var board = []
        for (var i = 0; i < size; i++) {
            board[i] = []
            for (var j = 0; j < size; j++)
                board[i][j] = ' '
        }
        var m = Math.floor(size / 2) - 1
        board[m][m] = 'W'
        board[m][m + 1] = 'B'
        board[m + 1][m + 1] = 'W'
        board[m + 1][m] = 'B'
        return board
    }
    // Deep clone of a board the reduce risk of damaging the real board
    clone(board) {
        var size = board.length
        var b = []
        for (var i = 0; i < size; i++) {
            b[i] = []
            for (var j = 0; j < size; j++)
                b[i][j] = board[i][j]
        }
        return b
    }

    // Determines if a piece of the 'color' can be set at position 'i', 'j' (row, column, respectively)
    check(board, color, i, j) {
        var size = board.length
        if (board[i][j] != ' ') return false
        var rcolor = color == 'W' ? 'B' : 'W'
        //left
        var k = j - 1
        while (k >= 0 && board[i][k] == rcolor) k--
        if (k >= 0 && Math.abs(k - j) > 1 && board[i][k] == color) return true
        //right
        k = j + 1
        while (k < size && board[i][k] == rcolor) k++
        if (k < size && Math.abs(k - j) > 1 && board[i][k] == color) return true
        //up
        k = i - 1
        while (k >= 0 && board[k][j] == rcolor) k--
        if (k >= 0 && Math.abs(k - i) > 1 && board[k][j] == color) return true
        //down
        k = i + 1
        while (k < size && board[k][j] == rcolor) k++
        if (k < size && Math.abs(k - i) > 1 && board[k][j] == color) return true
        //left-top
        k = i - 1
        var l = j - 1
        while (k >= 0 && l >= 0 && board[k][l] == rcolor) {
            k--
            l--
        }
        if (k >= 0 && l >= 0 && Math.abs(k - i) > 1 && Math.abs(l - j) > 1 && board[k][l] == color) return true
        //left-bottom
        k = i + 1
        l = j - 1
        while (k < size && l >= 0 && board[k][l] == rcolor) {
            k++
            l--
        }
        if (k < size && l >= 0 && Math.abs(k - i) > 1 && Math.abs(l - j) > 1 && board[k][l] == color) return true
        //right-top
        k = i - 1
        l = j + 1
        while (k >= 0 && l < size && board[k][l] == rcolor) {
            k--
            l++
        }
        if (k >= 0 && l < size && Math.abs(k - i) > 1 && Math.abs(l - j) > 1 && board[k][l] == color) return true
        //right-bottom
        k = i + 1
        l = j + 1
        while (k < size && l < size && board[k][l] == rcolor) {
            k++
            l++
        }
        if (k < size && l < size && Math.abs(k - i) > 1 && Math.abs(l - j) > 1 && board[k][l] == color) return true
        return false
    }

    // Computes all the valid moves for the given 'color'
    valid_moves(board, color) {
        var moves = []
        //console.log('valid_moves moves:', moves);
        var size = board.length
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++)
                if (this.check(board, color, i, j)) moves.push([i, j])
        }
        return moves
    }

    // Determines if a piece of 'color' can be set
    can_play(board, color) {
        var size = board.length
        var i = 0
        while (i < size) {
            var j = 0
            while (j < size && !this.check(board, color, i, j)) j++
            if (j < size) return true
            i++
        }
        return false
    }

    // Computes the new board when a piece of 'color' is set at position 'i', 'j' (row, column respectively)
    // If it is an invalid movement stops the game and declares the other 'color' as winner
    move(board, i, j, color) {
        var white_move = color == 'W'
        var size = board.length
        if (board[i][j] != ' ') return false
        board[i][j] = color
        var rcolor = color == 'W' ? 'B' : 'W'
        var flag = false
        //left
        var k = j - 1
        while (k >= 0 && board[i][k] == rcolor) k--
        if (k >= 0 && Math.abs(k - j) > 1 && board[i][k] == color) {
            flag = true
            k = j - 1
            while (k > 0 && board[i][k] == rcolor) {
                board[i][k] = color
                k--
            }
        }
        //right
        k = j + 1
        while (k < size && board[i][k] == rcolor) k++
        if (k < size && Math.abs(k - j) > 1 && board[i][k] == color) {
            flag = true
            k = j + 1
            while (k < size && board[i][k] == rcolor) {
                board[i][k] = color
                k++
            }
        }
        //up
        k = i - 1
        while (k >= 0 && board[k][j] == rcolor) k--
        if (k >= 0 && Math.abs(k - i) > 1 && board[k][j] == color) {
            flag = true
            k = i - 1
            while (k >= 0 && board[k][j] == rcolor) {
                board[k][j] = color
                k--
            }
        }
        //down
        k = i + 1
        while (k < size && board[k][j] == rcolor) k++
        if (k < size && Math.abs(k - i) > 1 && board[k][j] == color) {
            flag = true
            k = i + 1
            while (k < size && board[k][j] == rcolor) {
                board[k][j] = color
                k++
            }
        }
        //left-top
        k = i - 1
        l = j - 1
        while (k >= 0 && l >= 0 && board[k][l] == rcolor) {
            k--
            l--
        }
        if (k >= 0 && l >= 0 && Math.abs(k - i) > 1 && Math.abs(l - j) > 1 && board[k][l] == color) {
            flag = true
            k = i - 1
            l = j - 1
            while (k >= 0 && l >= 0 && board[k][l] == rcolor) {
                board[k][l] = color
                k--
                l--
            }
        }
        //left-bottom
        var k = i + 1
        var l = j - 1
        while (k < size && l >= 0 && board[k][l] == rcolor) {
            k++
            l--
        }
        if (k < size && l >= 0 && Math.abs(k - i) > 1 && Math.abs(l - j) > 1 && board[k][l] == color) {
            flag = true
            var k = i + 1
            var l = j - 1
            while (k < size && l >= 0 && board[k][l] == rcolor) {
                board[k][l] = color
                k++
                l--
            }
        }
        //right-top
        var k = i - 1
        var l = j + 1
        while (k >= 0 && l < size && board[k][l] == rcolor) {
            k--
            l++
        }
        if (k >= 0 && l < size && Math.abs(k - i) > 1 && Math.abs(l - j) > 1 && board[k][l] == color) {
            flag = true
            var k = i - 1
            var l = j + 1
            while (k >= 0 && l < size && board[k][l] == rcolor) {
                board[k][l] = color
                k--
                l++
            }
        }
        //right-bottom
        var k = i + 1
        var l = j + 1
        while (k < size && l < size && board[k][l] == rcolor) {
            k++
            l++
        }
        if (k < size && l < size && Math.abs(k - i) > 1 && Math.abs(l - j) > 1 && board[k][l] == color) {
            flag = true
            var k = i + 1
            var l = j + 1
            while (k < size && l < size && board[k][l] == rcolor) {
                board[k][l] = color
                k++
                l++
            }
        }
        return flag
    }

    // Computes the winner in terms of number of pieces in the board
    winner(board, white, black) {
        var size = board.length
        var W = 0
        var B = 0
        for (var i = 0; i < size; i++)
            for (var j = 0; j < size; j++)
                if (board[i][j] == 'W') W++
                else if (board[i][j] == 'B') B++
        var msg = ' Pieces count W:' + W + ' B:' + B
        if (W == B) return 'Draw ' + msg
        return ((W > B) ? white : black) + msg
    }

    // Draw the board on the canvas
    print(board) {
        var size = board.length
        // Commands to be run (left as string to show them into the editor)
        var grid = []
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++)
                grid.push({ "command": "translate", "y": i, "x": j, "commands": [{ "command": "-" }, { "command": board[i][j] }] })
        }

        var commands = { "r": true, "x": 1.0 / size, "y": 1.0 / size, "command": "fit", "commands": grid }
        Konekti.client['canvas'].setText(commands)
    }
}


class Agente_min_maxI extends AgentIvan {
    constructor() {
        super();
        this.board = new BoardIvan();
    }

    compute(board, time) {
        var moves = this.board.valid_moves(board, this.color);
        var Mov_m;
        if (this.board.length <= 10) {
            Mov_m = this.minimax(board, this.color, 1000, -Infinity, Infinity);
        } else if (this.board.length <= 20) {
            Mov_m = this.minimax(board, this.color, 100, -Infinity, Infinity);
        } else if (this.board.length <= 30) {
            Mov_m = this.minimax(board, this.color, 5, -Infinity, Infinity);
        } else {
            Mov_m = this.minimax(board, this.color, 2, -Infinity, Infinity);
        }

        return moves[Mov_m.index];
    }

    minimax(board, color, profund, alpha, beta) {
        if (profund === 0 || !this.board.can_play(board, color)) {
            return { puntaje: this.valor_tablero(board, color) };
        }

        var moves = this.board.valid_moves(board, color);
        var Mov_mIndex = 0;
        var size = board.length;

        if (color === this.color) {
            var maxpuntaje = -Infinity;

            for (var i = moves.length - 1; i >= 0; i--) {
                var move = moves[i];
                var tablero_temp = this.board.clone(board);
                this.board.move(tablero_temp, move[0], move[1], color);
                var total = this.minimax(tablero_temp, this.opponent(color), profund - 1, alpha, beta);
                var puntaje = total.puntaje;
                if (puntaje > maxpuntaje) {
                    maxpuntaje = puntaje;
                    Mov_mIndex = i;
                }

                alpha = Math.max(alpha, puntaje);
                if (beta <= alpha) {
                    break;
                }
            }

            return { puntaje: maxpuntaje, index: Mov_mIndex };
        } else {
            var minpuntaje = Infinity;

            for (var i = moves.length - 1; i >= 0; i--) {
                var move = moves[i];
                var tablero_temp = this.board.clone(board);
                this.board.move(tablero_temp, move[0], move[1], color);
                var total = this.minimax(tablero_temp, this.opponent(color), profund - 1, alpha, beta);
                var puntaje = total.puntaje;
                if (puntaje < minpuntaje) {
                    minpuntaje = puntaje;
                    Mov_mIndex = i;
                }

                beta = Math.min(beta, puntaje);
                if (beta <= alpha) {
                    break;
                }
            }

            return { puntaje: minpuntaje, index: Mov_mIndex };
        }
    }

    valor_tablero(board, color) {
        var size = board.length;
        var W = 0;
        var B = 0;
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                if ((i === 0 && j === 0) || (i === 0 && j === size - 1) || (i === size - 1 && j === 0) || (i === size - 1 && j === size - 1)) {
                    if (board[i][j] === 'W') {
                        W += 500;
                    }
                    if (board[i][j] === 'B') {
                        B += 500;
                    }
                } else if (i === 0 || j === 0) {
                    if (board[i][j] === 'W') {
                        W += 50;
                    }
                    if (board[i][j] === 'B') {
                        B += 50;
                    }
                } else if (board[i][j] === 'W') {
                    W++;
                } else if (board[i][j] === 'B') {
                    B++;
                }
            }
        }

        if (color === 'W') {
            return W - B;
        } else {
            return B - W;
        }
    }

    opponent(color) {
        return color === 'W' ? 'B' : 'W';
    }
}