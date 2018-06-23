var glovar = {
  names: [],
  parts: [],
  permLength: 0
};


// functions

function getArrayBySelector(selector) {
  var
    len, i,
    result = $(selector).val().split(',');
  len = result.length;
  for (i = 0; i < len; i += 1) {
    result[i] = result[i].trim();
  }
  return result;
}

function updatePartSelTable() {
  var
    i, j,
    html = '',
    namesLength = glovar.names.length,
    partsLength = glovar.parts.length,
    div = $('#part-sel-div');
  html += '<table><thead><tr><th></th>';
  for (i = 0; i < partsLength; i += 1) {
    html += '<th>' + glovar.parts[i] + '</th>';
  }
  html += '</tr></thead><tbody><tr><td>(필수)</td>';
  for (i = 0; i < partsLength; i += 1) {
    html += '<td><input id="part-essential-' + i + '" type="checkbox" checked="checked" disabled="disabled"></td>';
  }
  html += '</tr>';
  for (i = 0; i < namesLength; i += 1) {
    html += '<tr><td>' + glovar.names[i] + '</td>';
    for (j = 0; j < partsLength; j += 1) {
      html += '<td><input id="part-' + i + '-' + j + '" type="checkbox"></td>';
    }
    html += '</tr>';
  }
  html += '</tbody></table>';

  div.html(html);
}

function updatePartSel() {
  var
    names = getArrayBySelector('#names-txt'),
    parts = getArrayBySelector('#parts-txt');
  if (names.length <= 1 && names[0].trim() === '') {
    alert('이름 난이 비었습니다.');
    $('#names-txt').trigger('focus');
    return;
  } else if (parts.length <= 1 && parts[0].trim() === '') {
    alert('파트 난이 비었습니다.');
    $('#parts-txt').trigger('focus');
    return;
  }
  glovar.names = names;
  glovar.parts = parts;
  updatePartSelTable();
}


function getAvail() {
  var
    i, j, tempArray,
    namesLength = glovar.names.length,
    partsLength = glovar.parts.length,
    avail = [];
  for (i = 0; i < partsLength; i += 1) {
    tempArray = [];
    for (j = 0; j < namesLength; j += 1) {
      if ($('#part-' + j + '-' + i).prop('checked')) {
        tempArray.push(j);
      }
    }
    avail.push(tempArray);
  }
  return avail;
}

function getEssential() {
  var
    i,
    partsLength = glovar.parts.length,
    essential = [];
  for (i = 0; i < partsLength; i += 1) {
    if ($('#part-essential-' + i).prop('checked')) {
      essential.push(i);
    }
  }
  return essential;
}

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
            __src[j] = __src[j]
              .slice(0, __srcJIndex)
              .concat(__src[j].slice(__srcJIndex + 1));
          }
        }
        _permutate(__src, temp.concat([_src[0][i]]));
      }
    }
  }
  _permutate(src);
  return result;
}

function getTbodyForRotation() {
  var
    i, j,
    avail = getAvail(),
    essential = getEssential(),
    perm,
    partsLength = glovar.parts.length,
    availLength = avail.length,
    essentialLength = essential.length,
    html = '';
  perm = permutation(avail);
  /*
  for (i = 0; i < essentialLength; i += 1) {
  }
  //*/
  glovar.permLength = perm.length;
  for (i = 0; i < glovar.permLength; i += 1) {
    html += '<tr><td>' + (i + 1) + '</td>';
    for (j = 0; j < partsLength; j += 1) {
      html += '<td>' + glovar.names[perm[i][j]] + '</td>';
    }
    html += '</tr>';
  }
  return html;
}

function updateRotation() {
  var
    i,
    partsLength = glovar.parts.length,
    html = '';
  if (!$('#part-sel-div').html().match(/table/i)) {
    return;
  }
  html += '<table><thead><tr><th>번호</th>';
  for (i = 0; i < partsLength; i += 1) {
    html += '<th>' + glovar.parts[i] + '</th>';
  }
  html += '</tr></thead><tbody>' + getTbodyForRotation() + '</tbody></table>';
  $('#rotation-div').html(html);
}

function updateRandomNumber() {
  var randomNumber = Math.floor(Math.random() * glovar.permLength) + 1;
  $('#get-random-number-btn').html("번호 뽑기: " + randomNumber);
}


function tdClick(e) {
  $(e.target).find('input[type="checkbox"]').trigger('click').trigger('focus');
}


// event listeners

$(document).ready(function () {
  $('#update-part-sel-btn').on('click', updatePartSel);
  $('#update-rotation-btn').on('click', updateRotation);
  $('#get-random-number-btn').on('click', updateRandomNumber);

  $('#part-sel-div').on('click', 'table>tbody>tr>td', tdClick);
});
