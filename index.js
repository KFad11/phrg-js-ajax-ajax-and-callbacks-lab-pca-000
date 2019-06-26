$(document).ready(function (){
});

function displayError(error) {
  $("#errors").html(`I'm sorry, there's been an error. Please try again.`)
}

function searchRepositories () {
  let searchTerm = $('#searchTerms').val()
  const theUrl = `https://api.github.com/search/repositories?q=${searchTerm}`;
  $.get(theUrl, function(data) {
    let repoList = data.items.map(repo => {
      return( "<p>" + repo.name + "</p>"
      + "<p>" + '<a href="#" data-repository="' + repo.name + '" data-owner="' + repo.owner.login + '"onclick="showCommits(this)">Get Commits</a>'  + "</p>")}).join("")
    $("#results").html(repoList)
  }).fail(function(error){
    displayError()
  });
}

function showCommits(el) {
    const repo = el.dataset.repository
    const owner = el.dataset.owner
    const url = `https://api.github.com/repos/${owner}/${repo}/commits`
    $.get(url,function(response) {
      console.log(response)
      const commitCollection = response.map(function(r) {
        return(
          `<p> ${r.sha} </p>`
        )
      }).join("")
      $("#details").html(commitCollection)
    })
  }
