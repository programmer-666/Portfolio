const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
// this code enables bootstrap tooltips

$(document).ready(function () {
    // Initialize an array to store selected tags
    var selectedTags = [];
    // Set the initial filter mode to 'OR'
    var filterMode = "OR";

    // Click event handler for the 'AND' filter button
    $("#andSort").click(function (e) {
        e.preventDefault(); // Prevent default action of the click event
        filterMode = "AND"; // Set the filter mode to 'AND'
        filterPosts(); // Call the function to filter posts
        $(this).addClass("btn-warning"); // Add 'btn-warning' class to the 'AND' button to highlight it
        $("#orSort").removeClass("btn-warning"); // Remove 'btn-warning' class from the 'OR' button
    });

    // Click event handler for the 'OR' filter button
    $("#orSort").click(function (e) {
        e.preventDefault(); // Prevent default action of the click event
        filterMode = "OR"; // Set the filter mode to 'OR'
        filterPosts(); // Call the function to filter posts
        $(this).addClass("btn-warning"); // Add 'btn-warning' class to the 'OR' button to highlight it
        $("#andSort").removeClass("btn-warning"); // Remove 'btn-warning' class from the 'AND' button
    });

    // Click event handler for tag elements within the card body
    $(".card-body #tag").click(function (e) {
        e.preventDefault(); // Prevent default action of the click event
        var tag = $(this).text().trim(); // Get the text of the clicked tag and trim any whitespace

        var index = selectedTags.indexOf(tag); // Find the index of the tag in the selectedTags array
        if (index === -1) {
            // If the tag is not in the array, add it
            selectedTags.push(tag);
            $(this).addClass("btn-secondary"); // Add 'btn-secondary' class to visually indicate selection
        } else {
            // If the tag is already in the array, remove it
            selectedTags.splice(index, 1);
            $(this).removeClass("btn-secondary"); // Remove 'btn-secondary' class to visually indicate deselection
        }

        filterPosts(); // Call the function to filter posts
    });

    // Function to filter posts based on selected tags and filter mode
    function filterPosts() {
        if (selectedTags.length === 0) {
            // If no tags are selected, show all posts
            $(".card.mb-3").show();
            $("#no-posts-message").remove(); // Remove any 'no posts' message
        } else {
            var postCount = 0; // Initialize a counter for visible posts
            // Loop through each post card
            $(".card.mb-3").each(function () {
                // Get the tags of the current post
                var postTags = $(this)
                    .find(".badge")
                    .map(function () {
                        return $(this).text().trim();
                    })
                    .get();

                var showPost; // boolean
                if (filterMode === "AND") {
                    // In 'AND' mode, show the post only if it contains all selected tags
                    showPost = selectedTags.every(function (tag) {
                        return postTags.includes(tag);
                    });
                } else {
                    // 'OR' mode
                    // In 'OR' mode, show the post if it contains any of the selected tags
                    showPost = selectedTags.some(function (tag) {
                        return postTags.includes(tag);
                    });
                }

                if (showPost) {
                    $(this).show(); // Show the post
                    postCount++; // Increment the visible post counter
                } else {
                    $(this).hide(); // Hide the post
                }
            });

            if (postCount === 0) {
                // If no posts are visible, show the 'no posts' message
                if ($("#no-posts-message").length === 0) {
                    $(".col-lg-9.col-md-8").append(
                        '<p id="no-posts-message" style="margin-top: 6rem;" class="h6 user-select-none d-flex justify-content-center align-items-center text-body-secondary">Post Bulunamadı</p>',
                    );
                }
            } else {
                // If there are visible posts, remove the 'no posts' message
                $("#no-posts-message").remove();
            }
        }
    }
});
