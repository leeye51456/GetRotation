
function permutation(src) {
  var result = [];
  function _permutate(_src, _temp) {
    var
      i, j,
      __src,
      temp = _temp || [],
      _srcLen = _src[0].length,
      __srcLen, __srcJIndex;
    if (_src.length === 1) {
      if (_srcLen > 0) {
        for (i = 0; i < _srcLen; i += 1) {
          result.push(temp.concat([_src[0][i]]));
        }
      }
    } else if (_srcLen > 0) {
      for (i = 0; i < _srcLen; i += 1) {
        __src = _src.slice(1);
        __srcLen = __src.length;
        for (j = 0; j < __srcLen; j += 1) {
          __srcJIndex = __src[j].indexOf(_src[0][i]);
          if (__srcJIndex !== -1) {
            __src[j] = __src[j].slice(0, __srcJIndex).concat(__src[j].slice(__srcJIndex + 1));
          }
        }
        _permutate(__src, temp.concat([_src[0][i]]));
      }
    }
  }
  _permutate(src);
  return result;
}



// http://stackoverflow.com/questions/9960908/permutations-in-javascript

function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}
